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

import java.text.MessageFormat;
import java.util.HashSet;
import java.util.Set;

import org.fstrf.stanfordAsiInterpreter.resistance.definition.Definition;
import org.fstrf.stanfordAsiInterpreter.resistance.definition.RuleCondition;
import org.fstrf.stanfordAsiInterpreter.resistance.grammar.AsiGrammarEvaluator;

public class EvaluatedCondition {

	private static final MessageFormat FORMAT = 
		new MessageFormat("{0}statement: {1},{0}definitions: {2}'}'");
	
	private RuleCondition ruleCondition;
	private AsiGrammarEvaluator evaluator;
	private Set definitions;
	
	public EvaluatedCondition(RuleCondition ruleCondition, AsiGrammarEvaluator evaluator) {
		this.ruleCondition = ruleCondition;
		this.evaluator = evaluator;
		this.definitions = new HashSet();
	}
	
	public void addDefinition(Definition definition) {
		if(definition != null) {
			this.definitions.add(definition);
		}
	}

	public RuleCondition getRuleCondition() {
		return this.ruleCondition;
	}

	public AsiGrammarEvaluator getEvaluator() {
		return this.evaluator;
	}

	public Set getDefinitions() {
		return this.definitions;
	}
	
	public String toString() {
		Object[] objs = { "\n\t\t", this.ruleCondition, this.definitions };
		return FORMAT.format(objs);
	}
}
