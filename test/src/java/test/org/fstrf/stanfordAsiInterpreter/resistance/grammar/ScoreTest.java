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

@SuppressWarnings("all") public class ScoreTest extends TestCase {
	
	private StringMutationComparator comparator;
	private List mutations;
	
	public void setUp(){
		this.comparator = new StringMutationComparator(false);
		this.mutations = new ArrayList();
		this.mutations.add("41L");
		this.mutations.add("50VW");
		this.mutations.add("Q98LRG");
	}
	
	public void testScoreSimpleResidueList() {
		String statement = "SCORE FROM (41(NOTL)=>2.5,50WVA=>2,Q98AST=>10)";
        AsiGrammarAdapter adapter = AsiGrammarTestHelper.applyStatement(statement, this.mutations, this.comparator);

		assertEquals(2.0, ((Double)adapter.getResult()).doubleValue(), 0);
	}
	
	public void testScoreExcludeResidueList() {
		String statement = "SCORE FROM (41(NOTL)=>2.5,50W AND EXCLUDE 50VA=>2,Q98AST=>10)";
        AsiGrammarAdapter adapter = AsiGrammarTestHelper.applyStatement(statement, this.mutations, this.comparator);

		assertEquals(0.0, ((Double)adapter.getResult()).doubleValue(), 0);
	}
	
	public void testScoreExcludeNotResidueList() {
		String statement = "SCORE FROM (41(NOTL)=>2.5,50W AND EXCLUDE 50(NOTV)=>2,Q98ASRT=>10)";
        AsiGrammarAdapter adapter = AsiGrammarTestHelper.applyStatement(statement, this.mutations, this.comparator);

		assertEquals(10.0, ((Double)adapter.getResult()).doubleValue(), 0);
	}
	
	public void testScoreMaxResidueList() {
		String statement = "SCORE FROM (MAX (41L => 50, 50N => 100))";
		AsiGrammarAdapter adapter = AsiGrammarTestHelper.applyStatement(statement, this.mutations, this.comparator);
		
		assertEquals(50.0, ((Double)adapter.getResult()).doubleValue(), 0);
	}
	
	public void testScoreNegativeMaxResidueList() {
		String statement = "SCORE FROM (MAX (41L => -50, 50N => 100, 50V=>-40))";
		AsiGrammarAdapter adapter = AsiGrammarTestHelper.applyStatement(statement, this.mutations, this.comparator);
		
		assertEquals(-40, ((Double)adapter.getResult()).doubleValue(), 0);
	}
	
	public void testScoreNegMaxWithZeroScoreResidueList() {
		String statement = "SCORE FROM (MAX (41L => -50, 50V=>0, 50N => 100))";
		AsiGrammarAdapter adapter = AsiGrammarTestHelper.applyStatement(statement, this.mutations, this.comparator);
		
		assertEquals(0, ((Double)adapter.getResult()).doubleValue(), 0);
	}
	
	public void testScoreMaxWithNoFiredScore() {
		String statement = "SCORE FROM (MAX (41T => -50, 50L=>0, 50N => 100))";
		AsiGrammarAdapter adapter = AsiGrammarTestHelper.applyStatement(statement, this.mutations, this.comparator);
		
		assertEquals(0, ((Double)adapter.getResult()).doubleValue(), 0);
	}
	
	public void testScoreMaxWithBooleanCondition() {
		String statement = "SCORE FROM (MAX (41L => -50, 50N => 100, 100T=>0, 55W=>-40),50V=>3)";
		AsiGrammarAdapter adapter = AsiGrammarTestHelper.applyStatement(statement, this.mutations, this.comparator);
		
		assertEquals(-47.0, ((Double)adapter.getResult()).doubleValue(), 0);
	}
	
	public void testScoreSubconditionSelectResidueList() {
		String statement = "SCORE FROM (SELECT ATLEAST 1 FROM (41L, Q98L) AND 50V => -50, 50N => 100)";
		AsiGrammarAdapter adapter = AsiGrammarTestHelper.applyStatement(statement, this.mutations, this.comparator);
		
		assertEquals(-50.0, ((Double)adapter.getResult()).doubleValue(), 0);
	}
	
	public void testScoreLogicSymbolsResidueList() {
		String statement = "SCORE FROM ((41M OR (Q98L AND 50V)) AND 50V => -50, (SELECT ATLEAST 1 AND NOTMORETHAN 2 FROM(41L,50VW,45L) AND 50V) AND 41V => 100)";
		AsiGrammarAdapter adapter = AsiGrammarTestHelper.applyStatement(statement, this.mutations, this.comparator);
		
		assertEquals(-50.0, ((Double)adapter.getResult()).doubleValue(), 0);
	}
}
