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

import java.util.Iterator;
import java.util.List;

import org.fstrf.stanfordAsiInterpreter.resistance.ASIEvaluationException;
import org.fstrf.stanfordAsiInterpreter.resistance.ASIParsingException;

public class ScoreRangeAction implements RuleAction {
	
	private List rangeValues;
	
	public ScoreRangeAction(List rangeValues) throws ASIParsingException {		
		this.checkForOverlappingRanges(rangeValues);
		this.rangeValues = rangeValues;
	}
	
	private void checkForOverlappingRanges(List rangeValues) throws ASIParsingException {
		for(Iterator iter1 = rangeValues.iterator(); iter1.hasNext();) {
			RangeValue rangeValue1 = (RangeValue) iter1.next();
			for(Iterator iter2 = rangeValues.iterator(); iter2.hasNext();) {
				RangeValue rangeValue2 = (RangeValue) iter2.next();
				if(!rangeValue1.equals(rangeValue2) && rangeValue1.isOverlapping(rangeValue2)) {
					throw new ASIParsingException("Score range values overlap: " + rangeValue1 + ", " + rangeValue2);
				}
			}
		}
	}

	public Definition evaluate(Object result) throws ASIEvaluationException {
		Double reslt = (Double) result;
		for(Iterator iterator = rangeValues.iterator(); iterator.hasNext();) {
			RangeValue rangeValue = (RangeValue) iterator.next();
			if(rangeValue.withinRange(reslt.doubleValue())) {
				return rangeValue.getLevel();
			}
		}
		throw new ASIEvaluationException("No score range has been defined for a score of: " + result);
	}

	public boolean supports(Class resultType) {
		return resultType.equals(Double.class);
	}
}
