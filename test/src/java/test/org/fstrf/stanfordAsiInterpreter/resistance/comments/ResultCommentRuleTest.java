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

package test.org.fstrf.stanfordAsiInterpreter.resistance.comments;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.fstrf.stanfordAsiInterpreter.resistance.AsiTransformer;
import org.fstrf.stanfordAsiInterpreter.resistance.definition.CommentDefinition;
import org.fstrf.stanfordAsiInterpreter.resistance.definition.Definition;
import org.fstrf.stanfordAsiInterpreter.resistance.definition.Gene;
import org.fstrf.stanfordAsiInterpreter.resistance.evaluate.EvaluatedGene;
import org.fstrf.stanfordAsiInterpreter.resistance.evaluate.EvaluatedResultCommentRule;
import org.fstrf.stanfordAsiInterpreter.resistance.grammar.MutationComparator;
import org.fstrf.stanfordAsiInterpreter.resistance.grammar.StringMutationComparator;
import org.fstrf.stanfordAsiInterpreter.resistance.xml.XmlAsiTransformer;

import junit.framework.TestCase;

/**
 * This class tests that the logic for evaluating Result Comment Rules
 * returns result comments as expected
 *
 * @author Kyle Lambert
 */
public class ResultCommentRuleTest extends TestCase
{

	/*
	 * Test LTE,GTE,...
	 */
	public void testComparisons() throws FileNotFoundException, Exception {
		AsiTransformer transformer = new XmlAsiTransformer(true);
    	File algorithmFile = new File("test/files/result_based_comments/ComparisonTest.xml");
    	Map<String,Gene> geneMap = transformer.transform(new FileInputStream(algorithmFile));
    	Gene gene = geneMap.get("PR");
    	List<String> mutations = Arrays.asList("20T");
    	MutationComparator mutationComparator = new StringMutationComparator(false);

    	EvaluatedGene evaluatedGene = gene.evaluate(mutations, mutationComparator);

    	/*
    	 * In the ComparisonTest file, ATV/r will evaluate to level 3, so ONLY the following comments are expected
    	 * 	- GTE2
    	 * 	- GTE3
    	 * 	- GT2
    	 * 	- LTE3
    	 * 	- LTE4
    	 * 	- LT4
    	 * 	- EQ3
    	 * 	- NEQ2
    	 * 	- NEQ4
    	 *
    	 * The following comments are in the algorithm, but should evaluate to false and not be included in the output
    	 * 	- GTE4
    	 * 	- GT3
    	 * 	- GT4
    	 * 	- LTE2
    	 * 	- LT2
    	 * 	- LT3
    	 * 	- EQ2
    	 * 	- EQ4
    	 * 	- NEQ3
    	 *
    	 */
    	Set<String> expectedCommentIds = new HashSet<String>(Arrays.asList(
    			"GTE2","GTE3",
    			"GT2",
    			"LTE3","LTE4",
    			"LT4",
    			"EQ3",
    			"NEQ2","NEQ4"));

    	Set<String> actualCommentIds = new HashSet<String>();

    	Collection<EvaluatedResultCommentRule> evaluatedResultCommentRules = evaluatedGene.getEvaluatedResultCommentRules();

    	System.out.println("Comments: ");
    	for (EvaluatedResultCommentRule evaluatedResultCommentRule: evaluatedResultCommentRules) {
    		for (Definition definition: evaluatedResultCommentRule.getDefinitions()) {
    			CommentDefinition comment = (CommentDefinition) definition;
    			actualCommentIds.add(comment.getId());
    			System.out.println(comment.toString());
    		}
    	}
    	System.out.println();
    	//Comment sets should be exactly the same
    	assert(expectedCommentIds.equals(actualCommentIds));

	}


	/*
	 * Test <LTE> and <GT> together and in different order
	 * uses ComplexResultComments.xml
	 */
	public void testMultipleComparisons() throws FileNotFoundException, Exception {
		AsiTransformer transformer = new XmlAsiTransformer(true);
    	File algorithmFile = new File("test/files/result_based_comments/ComplexResultComments.xml");
    	Map<String,Gene> geneMap = transformer.transform(new FileInputStream(algorithmFile));
    	Gene gene = geneMap.get("PR");
    	List<String> mutations = Arrays.asList("10F","33F","88S","90M");
    	MutationComparator mutationComparator = new StringMutationComparator(false);

    	EvaluatedGene evaluatedGene = gene.evaluate(mutations, mutationComparator);

    	/*
    	 * The drugs in the algorithm should have the following level assignments:
    	 * 	FPV/r: 	1
    	 * 	IDV/r: 	2
    	 * 	LPV/r: 	3
    	 * 	NFV: 	4
    	 * 	SQV/r: 	5
    	 *
    	 * Therefore, only IDV/r, LPV/r, and NFV should have the result comment "BetweenTwoAndFour",
    	 * which has the logic GTE2 and LTE4
    	 */

    	Set<String> expectedCommentIds = new HashSet<String>(Arrays.asList(
    			"IDV_BetweenTwoAndFour",
    			"LPV_BetweenTwoAndFour",
    			"NFV_BetweenTwoAndFour"));

    	Set<String> actualCommentIds = new HashSet<String>();

    	Collection<EvaluatedResultCommentRule> evaluatedResultCommentRules = evaluatedGene.getEvaluatedResultCommentRules();

    	System.out.println("BetweenTwoAndFour Comments: ");
    	for (EvaluatedResultCommentRule evaluatedResultCommentRule: evaluatedResultCommentRules) {
    		for (Definition definition: evaluatedResultCommentRule.getDefinitions()) {
    			CommentDefinition comment = (CommentDefinition) definition;
    			//Just filter for the BetweenTwoAndFour comments
    			if (comment.getId().contains("BetweenTwoAndFour")) {
    				actualCommentIds.add(comment.getId());
    				System.out.println(comment.toString());
    			}
    		}
    	}
    	System.out.println();
    	//Comment sets should be exactly the same
    	assert(expectedCommentIds.equals(actualCommentIds));
	}

	/*
	 * Test "OR" with multiple Level Rules
	 * uses ComplexResultComments.xml
	 */
	public void testOR() throws FileNotFoundException, Exception {
		AsiTransformer transformer = new XmlAsiTransformer(true);
    	File algorithmFile = new File("test/files/result_based_comments/ComplexResultComments.xml");
    	Map<String,Gene> geneMap = transformer.transform(new FileInputStream(algorithmFile));
    	Gene gene = geneMap.get("PR");
    	List<String> mutations = Arrays.asList("10F","33F","88S","90M");
    	MutationComparator mutationComparator = new StringMutationComparator(false);

    	EvaluatedGene evaluatedGene = gene.evaluate(mutations, mutationComparator);

    	/*
    	 * The drugs in the algorithm should have the following level assignments:
    	 * 	FPV/r: 	1
    	 * 	IDV/r: 	2
    	 * 	LPV/r: 	3
    	 * 	NFV: 	4
    	 * 	SQV/r: 	5
    	 *
    	 * Therefore, only IDV/r and SQV/r should be assigned the "IsTwoOrFive" comment,
    	 * which is defined by two LevelRule blocks - one with EQ2 and one with EQ5
    	 */

    	Set<String> expectedCommentIds = new HashSet<String>(Arrays.asList(
    			"IDV_IsTwoOrFive",
    			"SQV_IsTwoOrFive"));

    	Set<String> actualCommentIds = new HashSet<String>();

    	Collection<EvaluatedResultCommentRule> evaluatedResultCommentRules = evaluatedGene.getEvaluatedResultCommentRules();

    	System.out.println("IsTwoOrFive Comments: ");
    	for (EvaluatedResultCommentRule evaluatedResultCommentRule: evaluatedResultCommentRules) {
    		for (Definition definition: evaluatedResultCommentRule.getDefinitions()) {
    			CommentDefinition comment = (CommentDefinition) definition;
    			//Just filter for the IsTwoOrFive comments
    			if (comment.getId().contains("IsTwoOrFive")) {
    				actualCommentIds.add(comment.getId());
    				System.out.println(comment.toString());
    			}
    		}
    	}
    	System.out.println();
    	//Comment sets should be exactly the same
    	assert(expectedCommentIds.equals(actualCommentIds));
	}

	public void testMultiDrugResultCommentRule() throws FileNotFoundException, Exception{
		AsiTransformer transformer = new XmlAsiTransformer(true);
    	File algorithmFile = new File("test/files/result_based_comments/ComplexResultComments.xml");
    	Map<String,Gene> geneMap = transformer.transform(new FileInputStream(algorithmFile));
    	Gene gene = geneMap.get("PR");
    	List<String> mutations = Arrays.asList("10F","33F","88S","90M");
    	MutationComparator mutationComparator = new StringMutationComparator(false);

    	EvaluatedGene evaluatedGene = gene.evaluate(mutations, mutationComparator);

    	/*
    	 * The drugs in the algorithm should have the following level assignments:
    	 * 	FPV/r: 	1
    	 * 	IDV/r: 	2
    	 * 	LPV/r: 	3
    	 * 	NFV: 	4
    	 * 	SQV/r: 	5
    	 *
    	 * Therefore, NFV and SQV/r are both GTE 4 and the multidrug comment NFV_SQV_BothHigh
    	 * should be triggered
    	 */
    	Set<String> expectedCommentIds = new HashSet<String>(Arrays.asList(
    			"MultiDrug_NFV_SQV_BothHigh"));

    	Set<String> actualCommentIds = new HashSet<String>();

    	Collection<EvaluatedResultCommentRule> evaluatedResultCommentRules = evaluatedGene.getEvaluatedResultCommentRules();

    	System.out.println("MultiDrug Comments: ");
    	for (EvaluatedResultCommentRule evaluatedResultCommentRule: evaluatedResultCommentRules) {
    		for (Definition definition: evaluatedResultCommentRule.getDefinitions()) {
    			CommentDefinition comment = (CommentDefinition) definition;
    			//Just filter for the IsTwoOrFive comments
    			if (comment.getId().contains("MultiDrug")) {
    				actualCommentIds.add(comment.getId());
    				System.out.println(comment.toString());
    			}
    		}
    	}
    	System.out.println();
    	//Comment sets should be exactly the same
    	assert(expectedCommentIds.equals(actualCommentIds));
	}

}

