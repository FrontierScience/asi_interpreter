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



package test.org.fstrf.stanfordAsiInterpreter.resistance.grammar;

import java.util.ArrayList;
import java.util.List;

import org.fstrf.stanfordAsiInterpreter.resistance.grammar.AsiGrammarAdapter;
import org.fstrf.stanfordAsiInterpreter.resistance.grammar.StringMutationComparator;

import junit.framework.TestCase;

@SuppressWarnings("all") public class SelectTest extends TestCase{

	private StringMutationComparator comparator;
	private List mutations;
	
	public void setUp(){
		this.comparator = new StringMutationComparator(false);
		this.mutations = new ArrayList();
		this.mutations.add("41L");
		this.mutations.add("50VW");
		this.mutations.add("Q98LRG");
	}
	
	public void testSelectExactly() {
		/*
		 * select exactly number from (residue list)
		 */
		
		String statement = "SELECT EXACTLY 2 FROM (41LRGFD, M50WERST, Q98A, 45ALT)";
        AsiGrammarAdapter adapter = AsiGrammarTestHelper.applyStatement(statement, this.mutations, this.comparator);

        assertEquals(true, ((Boolean)adapter.getResult()).booleanValue());	
	}
	
	public void testSelectAtLeast() {
		/*
		 * select atleast number from (residue list)
		 */
		
		String statement = "SELECT ATLEAST 1 FROM (41LRGFD, M50WERST, Q98A, 45ALT)";
        AsiGrammarAdapter adapter = AsiGrammarTestHelper.applyStatement(statement, this.mutations, this.comparator);

        assertEquals(true, ((Boolean)adapter.getResult()).booleanValue());	
	}
	
	public void testSelectANDAtLeast() {
		/*
		 * select atleast number from (residue list)
		 */
		
		String statement = "50V AND SELECT ATLEAST 1 FROM (41LRGFD, M50WERST, Q98A, 45ALT)";
        AsiGrammarAdapter adapter = AsiGrammarTestHelper.applyStatement(statement, this.mutations, this.comparator);

        assertEquals(true, ((Boolean)adapter.getResult()).booleanValue());	
	}
	
	public void testSelectNotMoreThan() {
		/*
		 * select notmorethan number from (residue list)
		 */
		
		String statement = "SELECT NOTMORETHAN 1 FROM (41LRGFD, M50WERST, Q98A, 45ALT)";
        AsiGrammarAdapter adapter = AsiGrammarTestHelper.applyStatement(statement, this.mutations, this.comparator);

        assertEquals(false, ((Boolean)adapter.getResult()).booleanValue());	
	}
	
	public void testSelectAtLeastAndNotMoreThan() {
		/*
		 * select atleast number logic symbol notmorethan number from (residue list)
		 */
		
		String statement = "SELECT ATLEAST 1 AND NOTMORETHAN 2 FROM (41LRGFD, M50WERST, Q98A, 45ALT)";
        AsiGrammarAdapter adapter = AsiGrammarTestHelper.applyStatement(statement, this.mutations, this.comparator);

        assertEquals(true, ((Boolean)adapter.getResult()).booleanValue());	
	}
	
	public void testSelectAtLeastOrNotMoreThan() {
		/*
		 * select atleast number logic symbol notmorethan number from (residue list)
		 */
		
		String statement = "SELECT ATLEAST 3 OR NOTMORETHAN 2 FROM (41LRGFD, M50WERST, Q98A, 45ALT)";
        AsiGrammarAdapter adapter = AsiGrammarTestHelper.applyStatement(statement, this.mutations, this.comparator);

        assertEquals(true, ((Boolean)adapter.getResult()).booleanValue());	
	}

}
