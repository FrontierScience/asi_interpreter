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

import org.fstrf.stanfordAsiInterpreter.resistance.ASIEvaluationException;


public class CommentAction implements RuleAction<CommentAction, CommentDefinition> {

	private CommentDefinition comment;
	
	public CommentAction(CommentDefinition comment) {
		this.comment = comment;
	}

	public CommentDefinition getComment() {
		return this.comment;
	}

	@Override
	public CommentDefinition evaluate(Object result) throws ASIEvaluationException {
		Boolean reslt = (Boolean) result;
		return reslt.booleanValue() ? this.comment : null;
	}

	@Override
	public boolean supports(Class<?> resultType) {
		return resultType.equals(Boolean.class);
	}
}
