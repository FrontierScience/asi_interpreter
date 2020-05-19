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



package org.fstrf.stanfordAsiInterpreter.resistance.evaluate;

import java.text.MessageFormat;
import java.util.Collection;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

import org.fstrf.stanfordAsiInterpreter.resistance.definition.Gene;

public class EvaluatedGene {

	private static final MessageFormat FORMAT =
		new MessageFormat("'{'Gene: {0}, Evaluated Drug Classes: {1}, Gene Comments: {2}'}'");

	private Gene gene;
	private Collection evaluatedDrugClasses;
	private Collection geneEvaluatedConditions;
	private Collection<EvaluatedResultCommentRule> evaluatedResultCommentRules;
	private Set geneScoredMutations;
	private Set geneCommentDefinitions;


	public EvaluatedGene(Gene gene, Collection geneEvaluatedConditions, Collection evaluatedDrugClasses, Collection<EvaluatedResultCommentRule> evaluatedResultCommentRules) {
		this.gene = gene;
		this.evaluatedDrugClasses =  evaluatedDrugClasses;
		this.geneScoredMutations = new HashSet();
		this.geneCommentDefinitions = new HashSet();
		this.parseGeneCommentDefinitions(geneEvaluatedConditions);
		this.evaluatedResultCommentRules = evaluatedResultCommentRules;
	}

	private void parseGeneCommentDefinitions(Collection geneEvaluatedConditions) {
		this.geneEvaluatedConditions = geneEvaluatedConditions;
		for(Iterator iterator = geneEvaluatedConditions.iterator(); iterator.hasNext();) {
			EvaluatedCondition evaluatedCondition = (EvaluatedCondition) iterator.next();
			this.geneScoredMutations.addAll(evaluatedCondition.getEvaluator().getScoredMutations());
			this.geneCommentDefinitions.addAll(evaluatedCondition.getDefinitions());
		}
	}

	public Collection getGeneEvaluatedConditions() {
		return this.geneEvaluatedConditions;
	}

	public Set getGeneScoredMutations() {
		return this.geneScoredMutations;
	}

	public Set getGeneCommentDefinitions() {
		return this.geneCommentDefinitions;
	}

	public Gene getGene(){
		return this.gene;
	}

	public Collection getEvaluatedDrugClasses(){
		return this.evaluatedDrugClasses;
	}

	public Collection<EvaluatedResultCommentRule> getEvaluatedResultCommentRules(){
		return this.evaluatedResultCommentRules;
	}

	@Override
	public String toString() {
		Object[] objs = { this.gene, this.evaluatedDrugClasses, this.geneCommentDefinitions };
		return FORMAT.format(objs);
	}
}
