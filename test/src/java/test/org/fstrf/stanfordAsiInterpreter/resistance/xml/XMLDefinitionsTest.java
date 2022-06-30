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
import java.util.Arrays;
import java.util.List;

import org.fstrf.stanfordAsiInterpreter.resistance.ASIParsingException;
import org.fstrf.stanfordAsiInterpreter.resistance.AsiTransformer;
import org.fstrf.stanfordAsiInterpreter.resistance.grammar.MutationComparator;
import org.fstrf.stanfordAsiInterpreter.resistance.grammar.StringMutationComparator;
import org.fstrf.stanfordAsiInterpreter.resistance.xml.XmlAsiTransformer;

import junit.framework.Assert;
import junit.framework.TestCase;

@SuppressWarnings("all") public class XMLDefinitionsTest extends TestCase{

	private File asiXmlFile;
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
			this.asiXmlFile = new File(filePath);
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
    
	public void testOverLappingRanges(){
		try{
			setAsiXmlFile("test/files/resistance_xml/HIVDB_overlappingRanges.xml");
			AsiTransformer transformer = new XmlAsiTransformer(this.validateXml);
			transformer.transform(new FileInputStream(this.asiXmlFile));
		}
		catch (ASIParsingException e){		
			System.out.println("testOverLappingRanges:\n\t" + e.getMessage());
			/*
			 * Assert.assertEquals(expected, actual)
			 */
			int actualErrMessage = e.getMessage().indexOf("Score range values overlap");
			Assert.assertEquals(true, (actualErrMessage > -1));
		}	
		catch (Exception ex){
			Assert.fail(ex.getMessage());
		}
	}
	
	
	public void testMultipleGlobalRangeTags(){
		try{
			setAsiXmlFile("test/files/resistance_xml/HIVDB_multipleGlobalRangeTags.xml");
			AsiTransformer transformer = new XmlAsiTransformer(this.validateXml);
			transformer.transform(new FileInputStream(this.asiXmlFile));
		}
		catch (ASIParsingException e){		
			System.out.println("testMultipleGlobalRangeTags:\n\t" + e.getMessage());
			int actualErrMessage = e.getMessage().indexOf("Not a Stanford resistance analysis XML file");
			Assert.assertEquals(true, (actualErrMessage > -1));
		}	
		catch (Exception ex){
			System.out.println("ex:"+ex.getMessage());
			Assert.fail(ex.getMessage());
		}
	}
	
	public void testMissingDrugClassName(){
		try{
			setAsiXmlFile("test/files/resistance_xml/HIVDB_missingDrugClassName.xml");
			AsiTransformer transformer = new XmlAsiTransformer(this.validateXml);
			transformer.transform(new FileInputStream(this.asiXmlFile));
		}
		catch (ASIParsingException e){		
			System.out.println("testMissingDrugClassName:\n\t" + e.getMessage());
			int actualErrMessage = e.getMessage().indexOf("Not a Stanford resistance analysis XML file");
			Assert.assertEquals(true, (actualErrMessage > -1));
		}	
		catch (Exception ex){
			System.out.println("ex:"+ex.getMessage());
			Assert.fail(ex.getMessage());
		}
	}
	
	public void testMissingDrugClassDrugList(){
		try{
			setAsiXmlFile("test/files/resistance_xml/HIVDB_missingDrugClassDrugList.xml");
			AsiTransformer transformer = new XmlAsiTransformer(this.validateXml);
			transformer.transform(new FileInputStream(this.asiXmlFile));
		}
		catch (ASIParsingException e){		
			System.out.println("testMissingDrugClassDrugList:\n\t" + e.getMessage());
			int actualErrMessage = e.getMessage().indexOf("Not a Stanford resistance analysis XML file");
			Assert.assertEquals(true, (actualErrMessage > -1));
		}	
		catch (Exception ex){
			System.out.println("ex:"+ex.getMessage());
			Assert.fail(ex.getMessage());
		}
	}
	
	public void testMultipleCommentDefinitionTags(){
		try{
			setAsiXmlFile("test/files/resistance_xml/HIVDB_multipleCommentDefinitionTags.xml");
			AsiTransformer transformer = new XmlAsiTransformer(this.validateXml);
			transformer.transform(new FileInputStream(this.asiXmlFile));
		}
		catch (ASIParsingException e){		
			System.out.println("testMultipleCommentDefinitionTags:\n\t" + e.getMessage());
			int actualErrMessage = e.getMessage().indexOf("Not a Stanford resistance analysis XML file");
			Assert.assertEquals(true, (actualErrMessage > -1));
		}	
		catch (Exception ex){
			System.out.println("ex:"+ex.getMessage());
			Assert.fail(ex.getMessage());
		}
	}
	
	public void testMissingLevelDefinitionOrder(){
		try{
			setAsiXmlFile("test/files/resistance_xml/HIVDB_missingLevelDefinitionOrder.xml");
			AsiTransformer transformer = new XmlAsiTransformer(this.validateXml);
			transformer.transform(new FileInputStream(this.asiXmlFile));
		}
		catch (ASIParsingException e){		
			System.out.println("testMissingLevelDefinitionOrder:\n\t" + e.getMessage());
			int actualErrMessage = e.getMessage().indexOf("Not a Stanford resistance analysis XML file");
			Assert.assertEquals(true, (actualErrMessage > -1));
		}	
		catch (Exception ex){
			System.out.println("ex:"+ex.getMessage());
			Assert.fail(ex.getMessage());
		}
	}
	
	public void testMissingLevelDefinitionOriginal(){
		try{
			setAsiXmlFile("test/files/resistance_xml/HIVDB_missingLevelDefinitionOrder.xml");
			AsiTransformer transformer = new XmlAsiTransformer(this.validateXml);
			transformer.transform(new FileInputStream(this.asiXmlFile));
		}
		catch (ASIParsingException e){		
			System.out.println("testMissingLevelDefinitionOriginal:\n\t" + e.getMessage());
			int actualErrMessage = e.getMessage().indexOf("Not a Stanford resistance analysis XML file");
			Assert.assertEquals(true, (actualErrMessage > -1));
		}	
		catch (Exception ex){
			System.out.println("ex:"+ex.getMessage());
			Assert.fail(ex.getMessage());
		}
	}
	
	public void testMissingLevelDefinitionSIR(){
		try{
			setAsiXmlFile("test/files/resistance_xml/HIVDB_missingLevelDefinitionSIR.xml");
			AsiTransformer transformer = new XmlAsiTransformer(this.validateXml);
			transformer.transform(new FileInputStream(this.asiXmlFile));
		}
		catch (ASIParsingException e){		
			System.out.println("testMissingLevelDefinitionSIR:\n\t" + e.getMessage());
			int actualErrMessage = e.getMessage().indexOf("Not a Stanford resistance analysis XML file");
			Assert.assertEquals(true, (actualErrMessage > -1));
		}	
		catch (Exception ex){
			System.out.println("ex:"+ex.getMessage());
			Assert.fail(ex.getMessage());
		}
	}
	
}
    
	

