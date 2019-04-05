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
import java.util.HashSet;
import java.util.Set;

import org.fstrf.stanfordAsiInterpreter.resistance.definition.Definition;
import org.fstrf.stanfordAsiInterpreter.resistance.definition.LevelCondition;
import org.fstrf.stanfordAsiInterpreter.resistance.definition.LevelDefinition;
import org.fstrf.stanfordAsiInterpreter.resistance.definition.ResultCommentDrug;

public class EvaluatedLevelCondition {

	private static final MessageFormat FORMAT =
			new MessageFormat("{0}statement: {1},{0}definitions: {2}'}'");

	private LevelCondition levelCondition;
	private Boolean evaluationResult;
	private LevelDefinition scoredLevel;
	private Set<Definition> definitions;
	private ResultCommentDrug drug;

	public EvaluatedLevelCondition(LevelCondition levelCondition,boolean evaluationResult,LevelDefinition level,ResultCommentDrug drug){
		this.levelCondition = levelCondition;
		this.evaluationResult = evaluationResult;
		this.definitions = new HashSet<Definition>();
		this.scoredLevel = level;
		this.drug = drug;
	}

	public void addDefinition(Definition definition){
		if (definition != null){
			this.definitions.add(definition);
		}
	}

	public LevelCondition getLevelCondition(){
		return this.levelCondition;
	}

	public Set<Definition> getDefinitions() {
		return this.definitions;
	}

	public Boolean getResult(){
		return this.evaluationResult;
	}

	public LevelDefinition getScoredLevel(){
		return this.scoredLevel;
	}

	public ResultCommentDrug getDrug(){
		return this.drug;
	}

	@Override
	public String toString() {
		Object[] objs = { "\n\t\t", this.levelCondition, this.definitions };
		return FORMAT.format(objs);
	}
}