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
import org.fstrf.stanfordAsiInterpreter.resistance.evaluate.EvaluatedLevelCondition;

public class LevelCondition {

	private List<LevelConditionComparison> comparisons;

	public LevelCondition() throws ASIParsingException{
		this.comparisons = new ArrayList<LevelConditionComparison>();
	}

	public void addComparison(Integer levelOrder, String comparisonOperator) throws ASIParsingException{
		this.comparisons.add(new LevelConditionComparison(levelOrder,comparisonOperator));
	}

	public EvaluatedLevelCondition evaluate(LevelDefinition level,ResultCommentDrug drug){
		//Don't need to make a grammar adapter like in RuleCondition...
		boolean result = (this.comparisons.size() > 0); //Will set result to false by default if there are no comparisons
		for (LevelConditionComparison comparison: this.comparisons){
			result = result && comparison.evaluate(level);
		}
		return new EvaluatedLevelCondition(this,result,level,drug);
	}

	@Override
	public String toString(){
		StringBuffer buffer = new StringBuffer();
		String delim = "";
		for (LevelConditionComparison comparison: this.comparisons){
			buffer.append(delim);
			buffer.append("{"+comparison.toString()+"}");
			delim = " AND ";
		}
		return buffer.toString();
	}

}
