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

public class ResidueTest extends TestCase {
	
	private StringMutationComparator comparator;
	private List mutations;
	
	public void setUp(){
		this.comparator = new StringMutationComparator(false);
		this.mutations = new ArrayList();
		this.mutations.add("41L");
		this.mutations.add("50VW");
		this.mutations.add("Q98LRG");
	}
	
	public void testResidueWithOriginalAminoAcid() {
		/*
		 * original_amino_acid? codon mutated_amino_acid+
		 */
		String statement = "M41L";
        AsiGrammarAdapter adapter = AsiGrammarTestHelper.applyStatement(statement, this.mutations, this.comparator);

        assertEquals(true, ((Boolean)adapter.getResult()).booleanValue());		
	}
	
	public void testResidueWithoutOriginalAminoAcid() {
		/*
		 * codon mutated_amino_acid+
		 */
		String statement = "41L";
        AsiGrammarAdapter adapter = AsiGrammarTestHelper.applyStatement(statement, this.mutations, this.comparator);

        assertEquals(true, ((Boolean)adapter.getResult()).booleanValue());	
	}

	public void testResidueNotWithOriginalAminoAcid() {
		/*
		 * NOT original_amino_acid? codon mutated_amino_acid+
		 */
		String statement = "NOT M41L";
        AsiGrammarAdapter adapter = AsiGrammarTestHelper.applyStatement(statement, this.mutations, this.comparator);

        assertEquals(false, ((Boolean)adapter.getResult()).booleanValue());	
	}

	public void testResidueNotWithOriginalAminoAcidAndListOfAminoacids() {
		/*
		 * NOT original_amino_acid? codon mutated_amino_acid+
		 */
		String statement = "NOT M41LNK";
        AsiGrammarAdapter adapter = AsiGrammarTestHelper.applyStatement(statement, this.mutations, this.comparator);

        assertEquals(false, ((Boolean)adapter.getResult()).booleanValue());	
	}
	
	public void testResidueNotWithoutOriginalAminoAcid() {
		/*
		 * NOT original_amino_acid? codon mutated_amino_acid+
		 */
		String statement = "NOT 41L";
        AsiGrammarAdapter adapter = AsiGrammarTestHelper.applyStatement(statement, this.mutations, this.comparator);

        assertEquals(false, ((Boolean)adapter.getResult()).booleanValue());	
	}
	
	public void testResidueInvertWithOriginalAminoAcid() {
		/*
		 * original_amino_acid? codon (NOT mutated_amino_acid+)
		 */
		String statement = "N41(NOT L)";
        AsiGrammarAdapter adapter = AsiGrammarTestHelper.applyStatement(statement, this.mutations, this.comparator);

        assertEquals(false, ((Boolean)adapter.getResult()).booleanValue());	
	}

	public void testResidueInvertWithoutOriginalAminoAcid() {
		/*
		 * original_amino_acid? codon (NOT mutated_amino_acid+)
		 */
		String statement = "41(NOT L)";
        AsiGrammarAdapter adapter = AsiGrammarTestHelper.applyStatement(statement, this.mutations, this.comparator);

        assertEquals(false, ((Boolean)adapter.getResult()).booleanValue());	
	}
	
}
