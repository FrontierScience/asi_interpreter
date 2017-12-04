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

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.fstrf.stanfordAsiInterpreter.resistance.grammar.AsiGrammarAdapter;
import org.fstrf.stanfordAsiInterpreter.resistance.grammar.StringMutationComparator;
import org.fstrf.stanfordAsiInterpreter.resistance.grammar.lexer.LexerException;
import org.fstrf.stanfordAsiInterpreter.resistance.grammar.parser.ParserException;

import junit.framework.TestCase;

public class ExcludeTest extends TestCase {

	private StringMutationComparator comparator;
	private List mutations;
	
	public void setUp(){
		this.comparator = new StringMutationComparator(false);
		this.mutations = new ArrayList();
		this.mutations.add("41L");
		this.mutations.add("50VW");
		this.mutations.add("Q98LRG");
	}
	
	public void testExcludeResidueWithOriginalAminoacid() {
		/*
		 * exclude residue
		 */
		
		String statement = "EXCLUDE M41L";
        AsiGrammarAdapter adapter = AsiGrammarTestHelper.applyStatement(statement, this.mutations, this.comparator);

        assertEquals(false, ((Boolean)adapter.getResult()).booleanValue());	
	}
	
	public void testExcludeResidueWithoutOriginalAminoacid() throws ParserException, LexerException, IOException{
		/*
		 * exclude residue
		 */
		
		String statement = "EXCLUDE 41L";
        AsiGrammarAdapter adapter = AsiGrammarTestHelper.applyStatement(statement, this.mutations, this.comparator);

        assertEquals(false, ((Boolean)adapter.getResult()).booleanValue());		
	}
	
	public void testExcludeResidueNOTWithOriginalAminoacid() throws ParserException, LexerException, IOException{
		/*
		 * exclude residue
		 */
		
		String statement = "EXCLUDE NOT M41L";
        AsiGrammarAdapter adapter = AsiGrammarTestHelper.applyStatement(statement, this.mutations, this.comparator);

        assertEquals(true, ((Boolean)adapter.getResult()).booleanValue());		
	}
	
	public void testExcludeResidueNOTWithoutOriginalAminoacid() throws ParserException, LexerException, IOException{
		/*
		 * exclude residue
		 */
		
		String statement = "EXCLUDE NOT 41L";
        AsiGrammarAdapter adapter = AsiGrammarTestHelper.applyStatement(statement, this.mutations, this.comparator);

        assertEquals(true, ((Boolean)adapter.getResult()).booleanValue());	
	}
	
	public void testExcludeResidueInvertWithOriginalAminoacid() throws ParserException, LexerException, IOException{
		/*
		 * exclude residue
		 */
		
		String statement = "EXCLUDE M41(NOT L)";
        AsiGrammarAdapter adapter = AsiGrammarTestHelper.applyStatement(statement, this.mutations, this.comparator);

        assertEquals(true, ((Boolean)adapter.getResult()).booleanValue());		
	}
	
	public void testExcludeResidueInvertWithoutOriginalAminoacid() throws ParserException, LexerException, IOException{
		/*
		 * exclude residue
		 */
		
		String statement = "EXCLUDE 41(NOTL)";
        AsiGrammarAdapter adapter = AsiGrammarTestHelper.applyStatement(statement, this.mutations, this.comparator);

        assertEquals(true, ((Boolean)adapter.getResult()).booleanValue());		
	}

}
