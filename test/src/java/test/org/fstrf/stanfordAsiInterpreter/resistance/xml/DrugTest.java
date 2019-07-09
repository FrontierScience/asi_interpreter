/**
Copyright 2017 Frontier Science & Technology Research Foundation

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

ADDITIONAL DISCLAIMER:
In addition to the standard warranty exclusions and limitations of 
liability set forth in sections 7, 8 and 9 of the Apache 2.0 license 
that governs the use and development of this software, Frontier Science 
& Technology Research Foundation disclaims any liability for use of 
this software for patient care or in clinical settings. This software 
was developed solely for use in medical and public health research, and 
was not intended, designed, or validated to guide patient care.
*/ 



package test.org.fstrf.stanfordAsiInterpreter.resistance.xml;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import org.fstrf.stanfordAsiInterpreter.resistance.ASIEvaluationException;
import org.fstrf.stanfordAsiInterpreter.resistance.ASIParsingException;
import org.fstrf.stanfordAsiInterpreter.resistance.AsiTransformer;
import org.fstrf.stanfordAsiInterpreter.resistance.definition.Gene;
import org.fstrf.stanfordAsiInterpreter.resistance.evaluate.EvaluatedGene;
import org.fstrf.stanfordAsiInterpreter.resistance.grammar.MutationComparator;
import org.fstrf.stanfordAsiInterpreter.resistance.grammar.StringMutationComparator;
import org.fstrf.stanfordAsiInterpreter.resistance.xml.XmlAsiTransformer;

import junit.framework.Assert;
import junit.framework.TestCase;

@SuppressWarnings("all") public class DrugTest extends TestCase{

	private InputStream asiXmlFileStream;
    private String geneName;
    private List mutations;
    private boolean strictComparison;
    private boolean validateXml;
    private MutationComparator mutationComparator;
	private String mutationList;
    
    public void setUp() {
	    this.strictComparison = false;
		this.validateXml = true;
		this.geneName = "RT";
		this.mutationComparator = new StringMutationComparator(this.strictComparison);
		this.mutationList = "41L,75MA,98G,100I,90M";
		setMutations(mutationList, mutationComparator);
	}
    private void setAsiXmlFile(String filePath) {
		try {
			this.asiXmlFileStream = DrugTest.class.getClassLoader().getResourceAsStream(filePath);
		} catch(RuntimeException re) {
			System.err.println("Invalid ASI XML File: " + filePath);
			throw re;
		}
	}
	
	private void setMutations(String mutationsString, MutationComparator comparator) {
		this.mutations = Arrays.asList(mutationsString.split(","));
		if(!comparator.areMutationsValid(this.mutations)) {
			throw new RuntimeException("Mutations are not valid: " + mutationsString);
		}
	}
	
	public void testMissingDrugName(){
		try{
			setAsiXmlFile("resistance_xml/HIVDB_missingDrugName.xml");
			AsiTransformer transformer = new XmlAsiTransformer(this.validateXml);
			transformer.transform(this.asiXmlFileStream);
		}
		catch (ASIParsingException e){		
			System.out.println("testMissingDrugName:"+"\n\t"+e.getMessage());
			int actualErrMessage = e.getMessage().indexOf("Not a Stanford resistance analysis XML file");
			Assert.assertEquals(true, (actualErrMessage > -1));
		}	
		catch (Exception ex){
			System.out.println("ex:"+ex.getMessage());
			Assert.fail(ex.getMessage());
		}
	}
	
	public void testUndefinedDrugWithinADrugClass(){
		/*
		 * DLV drug is missing from NNRTI drug class 
		 * (the drug is associated with no drug class)
		 */
		try{
			setAsiXmlFile("resistance_xml/HIVDB_undefinedDrugWithinDrugClass.xml");
			AsiTransformer transformer = new XmlAsiTransformer(this.validateXml);
			transformer.transform(this.asiXmlFileStream);
		}
		catch (ASIParsingException e){		
			System.out.println("testUndefinedDrugWithinADrugClass:"+"\n\t"+e.getMessage());
			int actualErrMessage = e.getMessage().indexOf("The following drugs have not been associated with a drug class");
			Assert.assertEquals(true, (actualErrMessage > -1));
		}	
		catch (Exception ex){
			System.out.println("testUndefinedDrugWithinADrugClass ex:"+ex.getMessage());
			Assert.fail(ex.getMessage());
		}
	}
	
	public void testDefinedDrugWithinDifferentDrugClasses(){
		/*
		 * DLV drug defined in NNRTI and NRTI drug classes
		 */
		try{
			setAsiXmlFile("resistance_xml/HIVDB_definedDrugWithinDifferentDrugClasses.xml");
			AsiTransformer transformer = new XmlAsiTransformer(this.validateXml);
			transformer.transform(this.asiXmlFileStream);
		}
		catch (ASIParsingException e){		
			System.out.println("testDefinedDrugWithinDifferentDrugClasses:"+"\n\t"+e.getMessage());
			int actualErrMessage = e.getMessage().indexOf("has been defined for more than one drug class");
			Assert.assertEquals(true, (actualErrMessage > -1));
		}	
		catch (Exception ex){
			System.out.println("testDefinedDrugWithinDifferentDrugClasses ex:"+ex.getMessage());
			Assert.fail(ex.getMessage());
		}
	}
	
	public void testUndefinedDrug(){
		/*
		 * DLV drug is not defined under a DRUG tag 
		 */
		try{
			setAsiXmlFile("resistance_xml/HIVDB_undefinedDrug.xml");
			AsiTransformer transformer = new XmlAsiTransformer(this.validateXml);
			transformer.transform(this.asiXmlFileStream);
		}
		catch (ASIParsingException e){		
			System.out.println("testUndefinedDrug:"+"\n\t"+e.getMessage());
			int actualErrMessage = e.getMessage().indexOf("has not been defined as a drug");
			Assert.assertEquals(true, (actualErrMessage > -1));
		}	
		catch (Exception ex){
			System.out.println("ex:"+ex.getMessage());
			Assert.fail(ex.getMessage());
		}
	}
	
	
	public void testDrugWithoutAnyRule(){
		/*
		 * DLV drug does not have defined any rule 
		 */
		try{
			setAsiXmlFile("resistance_xml/HIVDB_drugWithoutAnyRule.xml");
			AsiTransformer transformer = new XmlAsiTransformer(this.validateXml);
			Map geneMap = transformer.transform(this.asiXmlFileStream);
			Gene gene =  (Gene) geneMap.get(this.geneName);
			EvaluatedGene evaluatedGene = gene.evaluate(this.mutations, this.mutationComparator);
			System.out.println("evaluated gene:" + evaluatedGene.toString());
		}	
		
		catch (ASIEvaluationException e){
	    	
			System.out.println("no rules for this drug:"+"\n\t"+e.getMessage());
			Assert.fail(e.getMessage());
			/*
			int actualErrMessage = e.getMessage().indexOf("does not support a result of type:");
			Assert.assertEquals(true, (actualErrMessage > -1));
			*/
	    }
		
		catch (Exception ex){
			System.out.println("testDrugWithoutAnyRule ex:"+ex.getMessage());
			Assert.fail(ex.getMessage());
		}
	}

}
