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
import org.fstrf.stanfordAsiInterpreter.resistance.evaluate.EvaluatedCondition;
import org.fstrf.stanfordAsiInterpreter.resistance.grammar.AsiGrammarEvaluator;
import org.fstrf.stanfordAsiInterpreter.resistance.grammar.MutationComparator;

@SuppressWarnings("all") public class Rule {

	private RuleCondition condition;
	private List actions;

	public Rule(RuleCondition condition, List actions) throws ASIParsingException {
		if(actions.size() == 0) {
			throw new ASIParsingException("no action exists for the rule:\n" + condition.getStatement());
		} else if(moreThanOneScoreRange(actions)) {
			throw new ASIParsingException("more than one score range for the rule:\n" + condition.getStatement());
		}
		this.condition = condition;
		this.actions = actions;
	}

	public RuleCondition getCondition() {
		return this.condition;
	}

	public List getActions() {
		return this.actions;
	}

	public EvaluatedCondition evaluate(List mutations, MutationComparator comparator) throws ASIEvaluationException {
		EvaluatedCondition evaluatedCondition =  this.condition.evaluate(mutations, comparator);
		AsiGrammarEvaluator evaluator = evaluatedCondition.getEvaluator();
		for(Iterator iter = this.actions.iterator(); iter.hasNext();) {
			RuleAction action = (RuleAction) iter.next();
			if(!action.supports(evaluator.getResult().getClass())){
				throw new ASIEvaluationException("Action: " + action + "; does not support a result of type: " + evaluator.getResult().getClass());
			}
			evaluatedCondition.addDefinition(action.evaluate(evaluator.getResult()));
		}
		return evaluatedCondition;
	}

	private boolean moreThanOneScoreRange(List actions) {
		int scoreRangeActionCount = 0;
		for(Iterator iterator = actions.iterator(); iterator.hasNext();) {
			RuleAction action = (RuleAction) iterator.next();
			if(action instanceof ScoreRangeAction) {
				scoreRangeActionCount += 1;
			}
		}
		return scoreRangeActionCount > 1;
	}

	@Override
    public String toString() {
		return this.condition.toString();
	}
}
