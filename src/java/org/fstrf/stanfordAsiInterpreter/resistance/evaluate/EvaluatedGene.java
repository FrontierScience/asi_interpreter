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

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

import org.fstrf.stanfordAsiInterpreter.resistance.definition.Definition;
import org.fstrf.stanfordAsiInterpreter.resistance.definition.Gene;

import com.google.common.base.Strings;

public class EvaluatedGene {

	private static final String FORMAT = "{Gene: %s, Evaluated Drug Classes: %s, Gene Comments: %s}";

	private Gene gene;
	private Collection<EvaluatedDrugClass> evaluatedDrugClasses;
	private Collection<EvaluatedCondition> geneEvaluatedConditions;
	private Collection<EvaluatedResultCommentRule> evaluatedResultCommentRules;
	private Set<String> geneScoredMutations;
	private Set<Definition> geneCommentDefinitions;


	public EvaluatedGene(Gene gene, Collection<EvaluatedCondition> geneEvaluatedConditions, Collection<EvaluatedDrugClass> evaluatedDrugClasses, Collection<EvaluatedResultCommentRule> evaluatedResultCommentRules) {
		this.gene = gene;
		this.evaluatedDrugClasses =  evaluatedDrugClasses;
		this.geneScoredMutations = new HashSet<>();
		this.geneCommentDefinitions = new HashSet<>();
		this.parseGeneCommentDefinitions(geneEvaluatedConditions);
		this.evaluatedResultCommentRules = evaluatedResultCommentRules;
	}

	private void parseGeneCommentDefinitions(Collection<EvaluatedCondition> geneEvaluatedConditions) {
		this.geneEvaluatedConditions = geneEvaluatedConditions;
		for(EvaluatedCondition evaluatedCondition : geneEvaluatedConditions) {
			this.geneScoredMutations.addAll(evaluatedCondition.getEvaluator().getScoredMutations());
			this.geneCommentDefinitions.addAll(evaluatedCondition.getDefinitions());
		}
	}

	public Collection<EvaluatedCondition> getGeneEvaluatedConditions() {
		return this.geneEvaluatedConditions;
	}

	public Set<String> getGeneScoredMutations() {
		return this.geneScoredMutations;
	}

	public Set<Definition> getGeneCommentDefinitions() {
		return this.geneCommentDefinitions;
	}

	public Gene getGene(){
		return this.gene;
	}

	public Collection<EvaluatedDrugClass> getEvaluatedDrugClasses(){
		return this.evaluatedDrugClasses;
	}

	public Collection<EvaluatedResultCommentRule> getEvaluatedResultCommentRules(){
		return this.evaluatedResultCommentRules;
	}

	@Override
	public String toString() {
		return Strings.lenientFormat(FORMAT, gene, evaluatedDrugClasses, geneCommentDefinitions);
	}
}
