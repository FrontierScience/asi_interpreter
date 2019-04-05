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

import java.io.*;
import java.util.ArrayList;
import java.util.List;

import org.fstrf.stanfordAsiInterpreter.resistance.grammar.AsiGrammarAdapter;
import org.fstrf.stanfordAsiInterpreter.resistance.grammar.StringMutationComparator;
import org.fstrf.stanfordAsiInterpreter.resistance.grammar.lexer.*;
import org.fstrf.stanfordAsiInterpreter.resistance.grammar.node.*;
import org.fstrf.stanfordAsiInterpreter.resistance.grammar.parser.*;

/**
 * @author <a href="mailto:buckley@fstrf.org">Eric Buckley</a>
 * @version @version@, @date@
 *
 */
public class Compiler
{

    /**
     * @param args
     */
    public static void main(String[] args)
    {
        try 
        {
        	
        	List mutationList = new ArrayList();
        	
        	
        	
			
        	/*
        	mutationList.add("41L");
        	mutationList.add("116RI");
        	mutationList.add("100T");
        	mutationList.add("55W");
        	mutationList.add("Q148HGKRE");
        	*/
        	
        	mutationList.add("41K");
        	//mutationList.add("116F");
        	mutationList.add("50VW");
        	mutationList.add("Q98LRG");
        	//mutationList.add("151M");
        	//mutationList.add("62V");
        	
        	/*
        	mutationList.add("K122E");
        	mutationList.add("I135T");
        	mutationList.add("I180M");
        	mutationList.add("Q182E");
        	mutationList.add("E215A");
        	mutationList.add("L210V");
        	mutationList.add("R211K");
        	mutationList.add("F214L");
        	mutationList.add("Q222H");
        	mutationList.add("T240R");
        	mutationList.add("P243A");
        	mutationList.add("V245L");
        	mutationList.add("L260I");
        	mutationList.add("G262A");
        	mutationList.add("I270T");
        	mutationList.add("G273W");
        	mutationList.add("K277Q");
        	mutationList.add("K281P");
        	mutationList.add("K287T");
        	mutationList.add("P294H");
        	mutationList.add("E298V");
        	
        	
        	System.out.println("Mutation list: " + mutationList);
        	
            /* (41(NOTL) OR 55W) AND EXCLUDE 116(NOTY) AND (SELECT ATLEAST 1 FROM (41L,116Y) OR 100RIW) AND 41L
            
            String testStatement = "(41(NOTL) OR 55W*) AND (SELECT ATLEAST 1 FROM (41L,116Y) AND 100RIW) AND 41L";
            String testStatement = "41(NOTL) AND (SELECT ATLEAST 1 FROM (41L,116Y) OR 100RIW) AND 41L";
            
            String testStatement = " SCORE FROM (41L => 15,"+
            "44AD => 2,"+
            "62V => 2,"+
            "65R => 15,"+
            "67d => 30, 67GN => 12, 67E => 10,"+ 
            "67HST => 5,"+
            "69di => 30, 69DGN => 10, 69AEIS => 2,"+
            "70R => 10, 70NST => 5,"+
            "75T => 30, 75MS => 20, 75A => 15,"+ 
            "75I => 10, 75L => 2,"+
            "77L => 10,"+
            "116Y => 10,"+
            "118I => 2,"+
            "151M => 50, 151L => 20,"+
            "184IV AND EXCLUDE 184(NOT IV) => -5,"+
            "210W => 15,"+
            "215(NOT TCDEFISVY) AND EXCLUDE 215T => 15, 215(NOT TCDEFISVY) => 7, 215FY => 30,"+ 
            "215CDEISV => 20,"+
            "219ENQW => 10, 219RT => 5"+
           ")";
            */
            //String testStatement = "SCORE FROM (41L=>1.3,55(NOTIR)=>3.0,116(NOTA) AND EXCLUDE 116(NOT I)=>5.0)";
            //String testStatement = "SCORE FROM (41L=>1,55(NOTIR)=>3.6,116(NOTA) AND EXCLUDE 116(NOT I)=>5)";
        	//String testStatement = "SCORE FROM (41L=>1.5)";
            //String testStatement ="SCORE FROM (41(NOTL)=>2.5,50WVA=>2,Q98AST=>10)";
        	//String testStatement = "41(NOT MN)";
        	//String testStatement = "SCORE FROM (SELECT ATLEAST 1 FROM (116F,116R) AND 41L AND SCORE FROM(41L=>-10, 55W=>-5.0) =>1,55(NOTIR)=>3.6, 116(NOTA) AND EXCLUDE 116(NOT I)=>5)";
        	//String testStatement = "SCORE FROM (SELECT ATLEAST 1 FROM (116F,116R) AND 41L AND SCORE FROM (41L=>1.5)=>1)";
        	//String testStatement = "SCORE FROM (MAX (41L => -50, 50N => 100, 100T=>0, 55W=>-40),50V=>3)";
        	//String testStatement = "151M AND SELECT ATLEAST 1 FROM (62V,75I,77L,116Y)";
        	String testStatement ="NOT Q41WLE";
        	//String testStatement = "M184V OR EXCLUDE K101(NOT EHNP)";
        	//String testStatement = "J151MN";
        	//String testStatement = "SELECT ATLEAST 2 OR NOTMORETHAN 3 FROM ( M41L, E44A, V75I, K219D )"; 
        	System.out.println(testStatement);
            // Create a Parser instance. 
            Parser p = new Parser(new Lexer(new PushbackReader(new StringReader(testStatement), 1024)));

            // Parse the input.
            Start tree = p.parse();

            // Apply the translation.
            //AsiGrammarAdapter adapter = new AsiGrammarAdapter(mutationList, (MutationComparator) new MutatedAminoAcidsComparator(false));
            AsiGrammarAdapter adapter = new AsiGrammarAdapter(mutationList, new StringMutationComparator(false));
            
            tree.apply(adapter);
            
            System.out.println("Result: " + adapter.getResult());
            
        } catch(Exception e)
        {
            System.out.println(e.getMessage());
        }
    }
}
