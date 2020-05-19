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

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.fstrf.stanfordAsiInterpreter.resistance.definition.Definition;
import org.fstrf.stanfordAsiInterpreter.resistance.definition.ResultCommentRule;

public class EvaluatedResultCommentRule
{
	private ResultCommentRule resultCommentRule;
	private Boolean evaluationResult;
	private List<EvaluatedDrugLevelCondition> evaluatedDrugLevelConditions;
	private Set<Definition> definitions;

	public EvaluatedResultCommentRule(ResultCommentRule resultCommentRule, boolean evaluationResult,List<EvaluatedDrugLevelCondition> evaluatedDrugLevelConditions) {
		this.resultCommentRule = resultCommentRule;
		this.evaluationResult = evaluationResult;
		this.evaluatedDrugLevelConditions = evaluatedDrugLevelConditions;
		this.definitions = new HashSet<Definition>();
	}

	public Boolean getResult() {
		return this.evaluationResult;
	}

	public ResultCommentRule getResultCommentRule() {
		return this.resultCommentRule;
	}

	public List<EvaluatedDrugLevelCondition> getEvaluatedDrugLevelConditions(){
		return this.evaluatedDrugLevelConditions;
	}

	public void addDefinition(Definition definition) {
		if (definition != null) {
			this.definitions.add(definition);
		}
	}

	public Set<Definition> getDefinitions(){
		return this.definitions;
	}

	@Override
	public String toString() {
		StringBuffer buffer = new StringBuffer();
		buffer.append("\t").append("Drug Level Conditions:").append("\n");
		for (EvaluatedDrugLevelCondition condition: this.evaluatedDrugLevelConditions) {
			buffer.append("\t\t").append("Condition: "+condition.getDrugLevelCondition()).append("\n");
			buffer.append("\t\t\t").append("Scored Level for "+condition.getDrug()+": "+condition.getScoredLevel().toString()).append('\n');
		}
		buffer.append("\t").append("Definitions:").append("\n");
		for(Definition definition: this.definitions) {
			buffer.append("\t\t").append("Comment: " + definition.toString()).append('\n');
		}
		buffer.append('\n');
		return buffer.toString();
	}

}
