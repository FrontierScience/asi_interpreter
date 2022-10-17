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
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

import org.fstrf.stanfordAsiInterpreter.resistance.definition.CommentDefinition;
import org.fstrf.stanfordAsiInterpreter.resistance.definition.Definition;
import org.fstrf.stanfordAsiInterpreter.resistance.definition.Drug;
import org.fstrf.stanfordAsiInterpreter.resistance.definition.LevelDefinition;
import org.fstrf.stanfordAsiInterpreter.resistance.definition.LevelDefinitionComparator;

import com.google.common.base.Strings;

public class EvaluatedDrug {

	private static final String FORMAT = "{Drug: %s, Scored Mutations: %s, Level: %s, Comments: %s}";

	private Drug drug;
	private Collection<EvaluatedCondition> evaluatedConditions;
	private Set<String> scoredMutations;
	private Set<LevelDefinition> levelDefinitions;
	private Set<CommentDefinition> commentDefinitions;

	public EvaluatedDrug(Drug drug, Collection<EvaluatedCondition> evaluatedConditions, int defaultLevel) {
		this.drug = drug;
		scoredMutations = new HashSet<>();
		levelDefinitions = new HashSet<>();
		commentDefinitions = new HashSet<>();
		this.parseEvaluatedConditions(evaluatedConditions);
	}

	private void parseEvaluatedConditions(Collection<EvaluatedCondition> evaluatedConditions) {
		this.evaluatedConditions = evaluatedConditions;
		for(EvaluatedCondition evaluatedCondition : evaluatedConditions) {
			this.scoredMutations.addAll(evaluatedCondition.getEvaluator().getScoredMutations());
			Set<Definition> definitions = evaluatedCondition.getDefinitions();
			for(Definition definition : definitions) {
				if(definition instanceof LevelDefinition) {
					this.levelDefinitions.add((LevelDefinition) definition);
				}
				if(definition instanceof CommentDefinition) {
					this.commentDefinitions.add((CommentDefinition) definition);
				}
			}
		}
	}

	public Collection<EvaluatedCondition> getEvaluatedConditions() {
		return this.evaluatedConditions;
	}

	public LevelDefinition getHighestLevelDefinition() {
		return (this.levelDefinitions.size() > 0) ?
				(LevelDefinition) Collections.max(this.levelDefinitions, new LevelDefinitionComparator()) : null;
	}

	public Set<CommentDefinition> getCommentDefinitions() {
		return this.commentDefinitions;
	}

	public Set<LevelDefinition> getLevelDefinitions() {
		return this.levelDefinitions;
	}

	public Set<String> getScoredMutations() {
		return this.scoredMutations;
	}

	public Drug getDrug() {
		return this.drug;
	}

	@Override
    public String toString() {
		Definition highestLevelDefinition = this.getHighestLevelDefinition();
		return Strings.lenientFormat(
			FORMAT, drug, scoredMutations,
			highestLevelDefinition == null ? "" : highestLevelDefinition.toString(),
			commentDefinitions
		);
	}
}
