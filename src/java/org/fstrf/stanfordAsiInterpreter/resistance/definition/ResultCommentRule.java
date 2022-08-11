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

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.fstrf.stanfordAsiInterpreter.resistance.ASIEvaluationException;
import org.fstrf.stanfordAsiInterpreter.resistance.evaluate.EvaluatedDrugLevelCondition;
import org.fstrf.stanfordAsiInterpreter.resistance.evaluate.EvaluatedResultCommentRule;

public class ResultCommentRule {

    private List<DrugLevelCondition> levelConditions;
    private List<CommentAction> levelActions;

    public ResultCommentRule(List<DrugLevelCondition> conditions, List<CommentAction> actions) {
        this.levelConditions = conditions;
        this.levelActions = actions;
    }

    public List<DrugLevelCondition> getConditions() {
        return this.levelConditions;
    }

    public List<CommentAction> getActions() {
        return this.levelActions;
    }

    public EvaluatedResultCommentRule evaluate(Map<String, LevelDefinition> drugResultLevels) throws ASIEvaluationException {
        List<EvaluatedDrugLevelCondition> evaluatedDrugLevelConditions = new ArrayList<EvaluatedDrugLevelCondition>();

        for (DrugLevelCondition drugLevelCondition : this.levelConditions) {
            // Verify if the drug level condition name is part of the evaluated gene's drug list
            String drugName = drugLevelCondition.getDrugName();
            if (drugResultLevels.containsKey(drugName)) {
                // Evaluate the level conditions for such given drug
                LevelDefinition drugResultLevel = drugResultLevels.get(drugName);
                evaluatedDrugLevelConditions.add(drugLevelCondition.evaluate(drugName, drugResultLevel));
            }
        }

        //default to false result if there are no evaluated drugs
        Boolean result = (evaluatedDrugLevelConditions.size() > 0);
        for (EvaluatedDrugLevelCondition evaluatedDrugLevelCondition : evaluatedDrugLevelConditions) {
            result = result && evaluatedDrugLevelCondition.getResult();
        }

        EvaluatedResultCommentRule evaluatedResultCommentRule = new EvaluatedResultCommentRule(this, result, evaluatedDrugLevelConditions);
        for (CommentAction action : this.levelActions) {
            // evaluate will cast the param to boolean to determine whether the action condition was met
            evaluatedResultCommentRule.addDefinition(action.evaluate(result));
        }
        return evaluatedResultCommentRule;
    }
}