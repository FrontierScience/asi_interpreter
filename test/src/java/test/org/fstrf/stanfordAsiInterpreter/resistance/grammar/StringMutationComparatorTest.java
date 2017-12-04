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

import org.fstrf.stanfordAsiInterpreter.resistance.grammar.StringMutationComparator;

import junit.framework.TestCase;

public class StringMutationComparatorTest extends TestCase {
	private StringMutationComparator strictComparator, lenientComparator;
	
	public void setUp() {
		this.strictComparator = new StringMutationComparator(true);
		this.lenientComparator = new StringMutationComparator(false);
	}
	
	public void testCompareEqualMutations() {
		assertEquals(0, this.strictComparator.compare("41L","41L"));
		assertEquals(0, this.strictComparator.compare("Y41L","41L"));
		
		assertEquals(0, this.lenientComparator.compare("41L","41L"));
		assertEquals(0, this.lenientComparator.compare("Y41L","41L"));
		assertEquals(0, this.lenientComparator.compare("Y41LC","41L"));
		assertEquals(0, this.lenientComparator.compare("Y41L","41LC"));
		assertEquals(0, this.lenientComparator.compare("Y41LP","41LC"));
	}
	
	public void testCompareNonEqualMutations() {
		assertNotSame(new Integer(0), new Integer(this.strictComparator.compare("41L","41P")));
		assertNotSame(new Integer(0), new Integer(this.strictComparator.compare("41L","41LP")));
		assertNotSame(new Integer(0), new Integer(this.strictComparator.compare("Y41L","41LP")));
		assertNotSame(new Integer(0), new Integer(this.strictComparator.compare("Y41L","Y52L")));
		
		assertNotSame(new Integer(0), new Integer(this.lenientComparator.compare("Y41L","41P")));
		assertNotSame(new Integer(0), new Integer(this.lenientComparator.compare("Y41LP","41TL")));
		assertNotSame(new Integer(0), new Integer(this.lenientComparator.compare("Y41L","Y52L")));
	}

}
