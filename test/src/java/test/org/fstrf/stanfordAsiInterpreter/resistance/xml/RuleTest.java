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
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.fstrf.stanfordAsiInterpreter.resistance.ASIEvaluationException;
import org.fstrf.stanfordAsiInterpreter.resistance.ASIParsingException;
import org.fstrf.stanfordAsiInterpreter.resistance.AsiTransformer;
import org.fstrf.stanfordAsiInterpreter.resistance.definition.CommentAction;
import org.fstrf.stanfordAsiInterpreter.resistance.definition.CommentDefinition;
import org.fstrf.stanfordAsiInterpreter.resistance.definition.Drug;
import org.fstrf.stanfordAsiInterpreter.resistance.definition.DrugClass;
import org.fstrf.stanfordAsiInterpreter.resistance.definition.Gene;
import org.fstrf.stanfordAsiInterpreter.resistance.definition.LevelDefinition;
import org.fstrf.stanfordAsiInterpreter.resistance.definition.Rule;
import org.fstrf.stanfordAsiInterpreter.resistance.definition.ScoreRangeAction;
import org.fstrf.stanfordAsiInterpreter.resistance.evaluate.EvaluatedGene;
import org.fstrf.stanfordAsiInterpreter.resistance.grammar.MutationComparator;
import org.fstrf.stanfordAsiInterpreter.resistance.grammar.StringMutationComparator;
import org.fstrf.stanfordAsiInterpreter.resistance.xml.XmlAsiTransformer;

import junit.framework.Assert;
import junit.framework.TestCase;

public class RuleTest extends TestCase{

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
	
	public void testMissingRequiredRuleElements(){
		/*
		 * a rule is missing the condition for DLV drug
		 */
		try{
			setAsiXmlFile("test/files/resistance_xml/HIVDB_missingCondition.xml");
			AsiTransformer transformer = new XmlAsiTransformer(this.validateXml);
			transformer.transform(new FileInputStream(this.asiXmlFile));
		}
		catch (ASIParsingException e){		
			System.out.println("CONDITION tag is a required element:"+"\n\t"+e.getMessage());
			int actualErrMessage = e.getMessage().indexOf("Not a Stanford resistance analysis XML file");
			Assert.assertEquals(true, (actualErrMessage > -1));
		}	
		catch (Exception ex){
			System.out.println("ex:"+ex.getMessage());
			Assert.fail(ex.getMessage());
		}
		
		/*
		 * a rule is missing the ACTIONS tag for DLV drug
		 */
		try{
			setAsiXmlFile("test/files/resistance_xml/HIVDB_missingActions.xml");
			AsiTransformer transformer = new XmlAsiTransformer(this.validateXml);
			transformer.transform(new FileInputStream(this.asiXmlFile));
		}
		catch (ASIParsingException e){		
			System.out.println("ACTIONS tag is a required element:"+"\n\t"+e.getMessage());
			int actualErrMessage = e.getMessage().indexOf("Not a Stanford resistance analysis XML file");
			Assert.assertEquals(true, (actualErrMessage > -1));
		}	
		catch (Exception ex){
			System.out.println("ex:"+ex.getMessage());
			Assert.fail(ex.getMessage());
		}
	}
	
	
	public void testRequiredGlobalRange(){
		try{
			setAsiXmlFile("test/files/resistance_xml/HIVDB_missingRequiredGlobalRange.xml");
			AsiTransformer transformer = new XmlAsiTransformer(this.validateXml);
			transformer.transform(new FileInputStream(this.asiXmlFile));
		}
		catch (ASIParsingException e){		
			System.out.println("GLOBALRANGE tag is a required element (some rules are using USE_GLOBALRANGE tag):"+"\n\t"+e.getMessage());
			int actualErrMessage = e.getMessage().indexOf("required global range does not exist");
			Assert.assertEquals(true, (actualErrMessage > -1));
		}	
		catch (Exception ex){
			System.out.println("ex:"+ex.getMessage());
			Assert.fail(ex.getMessage());
		}
	}
	
	public void testBooleanResultRuleActionTye() {
		/*
		 * for ETR drug, drug class NNRTI, for the rule, which is a boolean condition,
		 * the actions contain a SCORRANGE action
		 */
		Map geneMap = new HashMap();
		XmlAsiTransformer transformer = null;
		try{
			setAsiXmlFile("test/files/resistance_xml/HIVDB_invalidRuleActionType.xml");
			transformer = new XmlAsiTransformer(this.validateXml);
			geneMap = transformer.transform(new FileInputStream(this.asiXmlFile));
		}
		catch (ASIParsingException e){
			System.out.println("testInvalidRuleActionTye ASIParsingException:"+e.getMessage());
			Assert.fail(e.getMessage());
		}
		catch (Exception ex){
			System.out.println("testInvalidRuleActionTye Exception:"+ex.getMessage());
			Assert.fail(ex.getMessage());
		}
		
		try{
			Gene gene =  (Gene) geneMap.get(this.geneName);
			Set drugClasses = (Set)gene.getDrugClasses();
			DrugClass drugClass = null;
			for (Iterator iterator = drugClasses.iterator(); iterator.hasNext();) {
				drugClass = (DrugClass) iterator.next();
				if (drugClass.getClassName().equals("NNRTI")){
					break;
				}
			}
			Drug drug = null;
			for (Iterator iterator = drugClass.getDrugs().iterator(); iterator.hasNext();) {
				drug = (Drug) iterator.next();
				if (drug.getDrugName().equals("ETR")){
					break;
				}
			}
			
			Map levels = new HashMap();
			levels.put("1", new LevelDefinition(new Integer(1),"level 1","S"));
			levels.put("2", new LevelDefinition(new Integer(1),"level 1","S"));
			
			String scoreRangeStr = "(-INF TO 10 => 1, 11 TO INF  => 2)";
			List scoreRange = transformer.parseScoreRange(scoreRangeStr, levels);
			Rule drugRule = (Rule) drug.getDrugRules().get(0);
			drugRule.getActions().add(new ScoreRangeAction(scoreRange));
			
			try{
				EvaluatedGene evaluatedGene = gene.evaluate(this.mutations, this.mutationComparator);
			}
	    	catch (ASIEvaluationException e){
	    		System.out.println("the action does not support a result of type:"+"\n\t"+e.getMessage());
				int actualErrMessage = e.getMessage().indexOf("does not support a result of type:");
				Assert.assertEquals(true, (actualErrMessage > -1));
	    	}
		} //try
		catch (ASIParsingException asiParsingException){
			System.out.println("testInvalidRuleActionTye ASIParsingException (evaluate):"+asiParsingException.getMessage());
			Assert.fail(asiParsingException.getMessage());
		}
	}
	
	
	public void testDoubleResultRuleActionTye() {
		/*
		 * for ETR drug, drug class NNRTI, for the rule, which is a score condition,
		 * the actions contain a COMMENT action
		 */
		Map geneMap = new HashMap();
		XmlAsiTransformer transformer = null;
		try{
			setAsiXmlFile("test/files/resistance_xml/HIVDB_invalidDoubleResultRuleActionType.xml");
			transformer = new XmlAsiTransformer(this.validateXml);
			geneMap = transformer.transform(new FileInputStream(this.asiXmlFile));
		}
		catch (ASIParsingException e){
			System.out.println("testInvalidRuleActionTye ASIParsingException:"+e.getMessage());
			Assert.fail(e.getMessage());
		}
		catch (Exception ex){
			System.out.println("testInvalidRuleActionTye Exception:"+ex.getMessage());
			Assert.fail(ex.getMessage());
		}
		
		Gene gene =  (Gene) geneMap.get(this.geneName);
		Set drugClasses = (Set)gene.getDrugClasses();
		DrugClass drugClass = null;
		for (Iterator iterator = drugClasses.iterator(); iterator.hasNext();) {
			drugClass = (DrugClass) iterator.next();
			if (drugClass.getClassName().equals("NNRTI")){
				break;
			}
		}
		Drug drug = null;
		for (Iterator iterator = drugClass.getDrugs().iterator(); iterator.hasNext();) {
			drug = (Drug) iterator.next();
			if (drug.getDrugName().equals("ETR")){
				break;
			}
		}
		
		Rule drugRule = (Rule) drug.getDrugRules().get(0);
		drugRule.getActions().add(new CommentAction(new CommentDefinition("test","used in JUnit tests",new Integer(1))));
		
		try{
			EvaluatedGene evaluatedGene = gene.evaluate(this.mutations, this.mutationComparator);
		}
		catch (ASIEvaluationException e){
			System.out.println("the action does not support a result of type:"+"\n\t"+e.getMessage());
			int actualErrMessage = e.getMessage().indexOf("does not support a result of type:");
			Assert.assertEquals(true, (actualErrMessage > -1));
		}
	}


	public void testResultOutOfRange() {
		/*
		 * for ETR drug, drug class NNRTI, for the second rule, which is a boolean condition
		 * the actions contain a SCORRANGE action
		 */
		Map geneMap = new HashMap();
		XmlAsiTransformer transformer = null;
		try{
			setAsiXmlFile("test/files/resistance_xml/HIVDB_evaluationExceptioScoreRangeAction.xml");
			transformer = new XmlAsiTransformer(this.validateXml);
			geneMap = transformer.transform(new FileInputStream(this.asiXmlFile));
		}
		catch (ASIParsingException e){
			System.out.println("testInvalidRuleActionTye ASIParsingException:"+e.getMessage());
			Assert.fail(e.getMessage());
		}
		catch (Exception ex){
			System.out.println("testInvalidRuleActionTye Exception:"+ex.getMessage());
			Assert.fail(ex.getMessage());
		}
		
		Gene gene =  (Gene) geneMap.get(this.geneName);
		
		try{
			EvaluatedGene evaluatedGene = gene.evaluate(this.mutations, this.mutationComparator);
		}
		catch (ASIEvaluationException e){
			System.out.println("No score range has been defined for a score of:"+"\n\t"+e.getMessage());
			int actualErrMessage = e.getMessage().indexOf("No score range has been defined for a score of:");
			Assert.assertEquals(true, (actualErrMessage > -1));
		}
	}


}
