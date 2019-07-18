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

package org.fstrf.stanfordAsiInterpreter.resistance.definition;

import java.util.List;

import org.fstrf.stanfordAsiInterpreter.resistance.ASIEvaluationException;
import org.fstrf.stanfordAsiInterpreter.resistance.evaluate.EvaluatedLevelCondition;

public class LevelRule {

	private LevelCondition levelCondition;
	private List<CommentAction> levelActions;

	public LevelRule(LevelCondition condition, List<CommentAction> actions){
		this.levelCondition = condition;
		this.levelActions = actions;
	}

	public LevelCondition getCondition(){
		return this.levelCondition;
	}

	public List<CommentAction> getActions(){
		return this.levelActions;
	}

	public EvaluatedLevelCondition evaluate(LevelDefinition level,ResultCommentDrug drug) throws ASIEvaluationException{
		EvaluatedLevelCondition evaluatedLevelCondition = this.levelCondition.evaluate(level,drug);
		for (CommentAction action: this.levelActions){
			//evaluate will cast the param to boolean to determine whether the action condition was met
			evaluatedLevelCondition.addDefinition(action.evaluate(evaluatedLevelCondition.getResult()));
		}
		return evaluatedLevelCondition;
	}

}
