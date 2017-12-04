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

import java.io.PushbackReader;
import java.io.StringReader;
import java.util.List;

import org.fstrf.stanfordAsiInterpreter.resistance.ASIParsingException;
import org.fstrf.stanfordAsiInterpreter.resistance.evaluate.EvaluatedCondition;
import org.fstrf.stanfordAsiInterpreter.resistance.grammar.AsiGrammarAdapter;
import org.fstrf.stanfordAsiInterpreter.resistance.grammar.MutationComparator;
import org.fstrf.stanfordAsiInterpreter.resistance.grammar.lexer.Lexer;
import org.fstrf.stanfordAsiInterpreter.resistance.grammar.node.Start;
import org.fstrf.stanfordAsiInterpreter.resistance.grammar.parser.Parser;

public class RuleCondition {
	
	private static final int DEFAULT_BUFFER_SIZE = 1024;
	
	private String statement;
	private Start conditionTree;
	
	public RuleCondition(String statement) throws ASIParsingException {
		this.statement = statement;
		PushbackReader reader = new PushbackReader(new StringReader(this.statement), DEFAULT_BUFFER_SIZE);
		Parser parser = new Parser(new Lexer(reader));
		try {
			this.conditionTree = parser.parse();
		} catch(Exception e) {
			throw new ASIParsingException("Invalid condition statement: " + statement, e);
		}
	}
	
	public String getStatement(){
		return this.statement;
	}
	
	public EvaluatedCondition evaluate(List mutations, MutationComparator comparator) {
	    AsiGrammarAdapter adapter = new AsiGrammarAdapter(mutations, comparator);	    
	    this.conditionTree.apply(adapter);
	    return new EvaluatedCondition(this, adapter);
	}
	
	public String toString() {
		return this.statement;
	}
}
