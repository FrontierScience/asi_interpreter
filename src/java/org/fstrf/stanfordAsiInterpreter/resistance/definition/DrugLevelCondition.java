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

import org.fstrf.stanfordAsiInterpreter.resistance.ASIParsingException;
import org.fstrf.stanfordAsiInterpreter.resistance.evaluate.EvaluatedDrugLevelCondition;

public class DrugLevelCondition {

    private String drugName;
    private List<LevelConditionComparison> comparisons;

    public DrugLevelCondition(String drugName) {
        this.drugName = drugName;
        this.comparisons = new ArrayList<LevelConditionComparison>();
    }

    public void addComparison(Integer levelOrder, String comparisonOperator) throws ASIParsingException {
        this.comparisons.add(new LevelConditionComparison(levelOrder, comparisonOperator));
    }

    public EvaluatedDrugLevelCondition evaluate(String drugToCompare, LevelDefinition level) {
        // Don't need to make a grammar adapter like in RuleCondition...

        // Will set result to false by default if there are no comparisons
        boolean result = (drugToCompare.equals(this.drugName) && this.comparisons.size() > 0);

        for (LevelConditionComparison comparison : this.comparisons) {
            result = result && comparison.evaluate(level);
        }

        return new EvaluatedDrugLevelCondition(this, result, level, drugToCompare);
    }

    public String getDrugName() {
        return this.drugName;
    }

    public List<LevelConditionComparison> getComparisons() {
        return this.comparisons;
    }

    @Override
    public String toString() {
        StringBuffer buffer = new StringBuffer();
        String delim = "";
        buffer.append(this.drugName + " {");

        for (LevelConditionComparison comparison : this.comparisons) {
            buffer.append(delim);
            buffer.append(comparison.toString());
            delim = " AND ";
        }

        buffer.append("}");
        return buffer.toString();
    }
}