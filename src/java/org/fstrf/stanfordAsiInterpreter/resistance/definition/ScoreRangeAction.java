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
import org.fstrf.stanfordAsiInterpreter.resistance.ASIParsingException;

public class ScoreRangeAction implements RuleAction<ScoreRangeAction, LevelDefinition> {

	private List<RangeValue> rangeValues;

	public ScoreRangeAction(List<RangeValue> rangeValues) throws ASIParsingException {
		this.checkForOverlappingRanges(rangeValues);
		this.rangeValues = rangeValues;
	}

	private void checkForOverlappingRanges(List<RangeValue> rangeValues) throws ASIParsingException {
		for(RangeValue rangeValue1 : rangeValues) {
			for(RangeValue rangeValue2 : rangeValues) {
				if(!rangeValue1.equals(rangeValue2) && rangeValue1.isOverlapping(rangeValue2)) {
					throw new ASIParsingException("Score range values overlap: " + rangeValue1 + ", " + rangeValue2);
				}
			}
		}
	}

	@Override
    public LevelDefinition evaluate(Object result) throws ASIEvaluationException {
		Double reslt = (Double) result;
		for(RangeValue rangeValue : rangeValues) {
			if(rangeValue.withinRange(reslt.doubleValue())) {
				return rangeValue.getLevel();
			}
		}
		throw new ASIEvaluationException("No score range has been defined for a score of: " + result);
	}

	@Override
    public boolean supports(Class<?> resultType) {
		return resultType.equals(Double.class);
	}
}
