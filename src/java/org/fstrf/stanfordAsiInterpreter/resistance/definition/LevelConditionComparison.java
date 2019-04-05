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

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

import org.fstrf.stanfordAsiInterpreter.resistance.ASIParsingException;

public class LevelConditionComparison {

	private String operator;
	private Integer levelOrder;
	private static Set<String> possibleOperators;
	private static String LTE,GTE,LT,GT,EQ,NEQ;

	static {
		LTE = "LTE";
		GTE = "GTE";
		LT = "LT";
		GT = "GT";
		EQ = "EQ";
		NEQ = "NEQ";
		possibleOperators = new HashSet<String>(Arrays.asList(LTE,GTE,LT,GT,EQ,NEQ));
	}

	public LevelConditionComparison(Integer levelOrder, String operator) throws ASIParsingException{
		this.levelOrder = levelOrder;
		if (!possibleOperators.contains(operator)){
			throw new ASIParsingException("Invalid level comparison operator: "+operator);
		}
		this.operator = operator;
	}

	/**
	 * evaluate method compares the member field levelOrder against the order of the
	 * LevelDefinition parameter, using the operator to determine how the comparison should be done
	 */
	public boolean evaluate(LevelDefinition level){
		Integer order = level.getOrder();
		//will return false by default
		boolean result;
		switch (this.operator.toUpperCase()) {
		case "LTE":
			result = (order <= this.levelOrder);
			break;
		case "GTE":
			result = (order >= this.levelOrder);
			break;
		case "GT":
			result = (order > this.levelOrder);
			break;
		case "LT":
			result = (order < this.levelOrder);
			break;
		case "EQ":
			result = (order == this.levelOrder);
			break;
		case "NEQ":
			result = (order != this.levelOrder);
			break;
		default:
			result = false;
		}
		return result;
	}

	@Override
	public String toString(){
		return (this.operator+" "+this.levelOrder);
	}

}
