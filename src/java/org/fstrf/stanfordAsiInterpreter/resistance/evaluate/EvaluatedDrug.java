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
import java.util.Collections;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

import org.fstrf.stanfordAsiInterpreter.resistance.definition.CommentDefinition;
import org.fstrf.stanfordAsiInterpreter.resistance.definition.Definition;
import org.fstrf.stanfordAsiInterpreter.resistance.definition.Drug;
import org.fstrf.stanfordAsiInterpreter.resistance.definition.LevelDefinition;
import org.fstrf.stanfordAsiInterpreter.resistance.definition.LevelDefinitionComparator;

@SuppressWarnings("all") public class EvaluatedDrug {

	private static final MessageFormat FORMAT =
		new MessageFormat("'{'Drug: {0}, Scored Mutations: {1}, Level: {2}, Comments: {3}'}'");

	private Drug drug;
	private Collection evaluatedConditions;
	private Set scoredMutations;
	private Set levelDefinitions;
	private Set commentDefinitions;

	public EvaluatedDrug(Drug drug, Collection evaluatedConditions, int defaultLevel) {
		this.drug = drug;
		scoredMutations = new HashSet();
		levelDefinitions = new HashSet();
		commentDefinitions = new HashSet();
		this.parseEvaluatedConditions(evaluatedConditions);
	}

	private void parseEvaluatedConditions(Collection evaluatedConditions) {
		this.evaluatedConditions = evaluatedConditions;
		for(Iterator iter = evaluatedConditions.iterator(); iter.hasNext();) {
			EvaluatedCondition evaluatedCondition = (EvaluatedCondition) iter.next();
			this.scoredMutations.addAll(evaluatedCondition.getEvaluator().getScoredMutations());
			Set definitions = evaluatedCondition.getDefinitions();
			for(Iterator iterator = definitions.iterator(); iterator.hasNext();) {
				Definition definition = (Definition) iterator.next();
				if(definition instanceof LevelDefinition) {
					this.levelDefinitions.add(definition);
				}
				if(definition instanceof CommentDefinition) {
					this.commentDefinitions.add(definition);
				}
			}
		}
	}

	public Collection getEvaluatedConditions() {
		return this.evaluatedConditions;
	}

	public LevelDefinition getHighestLevelDefinition() {
		return (this.levelDefinitions.size() > 0) ?
				(LevelDefinition) Collections.max(this.levelDefinitions, new LevelDefinitionComparator()) : null;
	}

	public Set getCommentDefinitions() {
		return this.commentDefinitions;
	}

	public Set getLevelDefinitions() {
		return this.levelDefinitions;
	}

	public Set getScoredMutations() {
		return this.scoredMutations;
	}

	public Drug getDrug() {
		return this.drug;
	}

	@Override
    public String toString() {
		Definition highestLevelDefinition = this.getHighestLevelDefinition();
		Object[] objs = { this.drug, this.scoredMutations,
							highestLevelDefinition == null ? "" : highestLevelDefinition.toString(),
							this.commentDefinitions};
		return FORMAT.format(objs);
	}
}
