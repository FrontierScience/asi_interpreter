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



package org.fstrf.stanfordAsiInterpreter.resistance.grammar;

import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.SortedSet;
import java.util.TreeSet;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.collections.CollectionUtils;

public class StringMutationComparator implements MutationComparator {
	
    private static final String AMINO_ACIDS = new String("ACDEFGHIKLMNPQRSTVWYZdi");
    private static final SortedSet AMINO_ACIDS_SET = stringToSortedCharacterSet(AMINO_ACIDS);
    private static final Pattern MUTATION_PATTERN = Pattern.compile("(?:[A-Z]?)(\\d+)([" + AMINO_ACIDS + "]+)");
    private static final int CODON_GROUP = 1;
    private static final int AMINO_ACIDS_GROUP = 2;
    
	/**
	 * whether or not amino acid sets will be compared on exact matches
	 */
	private boolean strictComparision;
	
	/**
     * Create a StringMutationComparator. If strictComparison is set to TRUE, then only exact amino
     * acid set matches will be considered equal.  If set to FALSE, then if just one amino acid
     * overlaps the two mutations will be considered equal.
     * 
     * e.g.
     * 46R will never equal 46T
     * 46RS equals 46ST if strictComparison is set to FALSE, however they are not equal if it is set to TRUE
     * 46RS equals 46RST regardless, because the smaller amino acid set of the two, is a subset of the larger
     * 
	 * @param strictComparision
	 */
	public StringMutationComparator(boolean strictComparision)
    {
		this.strictComparision=strictComparision;
	}
    
    /**
     * Convert a String into a SortedSet of Characters
     * 
     * @param str the String to convert
     * @return a SortedSet of Characters
     */
    private static SortedSet stringToSortedCharacterSet(String str)
    {
        SortedSet set = new TreeSet();
        for(int i = 0; i < str.length(); i++ ) { 
            set.add(new Character(str.charAt(i)));
        }
        return set;
    }
    
    /**
     * Concatenate a Collection into a String, by calling the toString() method on each element.
     * 
     * @param col the Collection to concatenate
     * @return a concatenated String representation of the elements
     */
    private static String collectionToString(Collection col)
    {
        StringBuffer buffer = new StringBuffer();
        for(Iterator iter = col.iterator(); iter.hasNext();)
        {
            buffer.append(iter.next().toString());
        }
        return buffer.toString();
    }
	
	/**
     * Compare String mutation 1 to String mutation 2.
     * 
	 * @see java.util.Comparator#compare(java.lang.Object, java.lang.Object)
	 */
	public int compare(Object o1, Object o2)
    {
		Matcher matcher1=MUTATION_PATTERN.matcher((String) o1);
		Matcher matcher2=MUTATION_PATTERN.matcher((String) o2);
		
		if(!matcher1.find() || !matcher2.find()) {
			/*
			 * if the mutation does not respect the pattern an error occurs
			 * example of accepted mutations: 41L, Y41L, 41L* 
			 */
			throw new RuntimeException("Invalid String formated mutations: " + o1 + ", " + o2);
		}
        
		Integer codon1 = new Integer(matcher1.group(CODON_GROUP));
        Integer codon2 = new Integer(matcher2.group(CODON_GROUP));
		if (!codon1.equals(codon2)){
			// if the codons are different then the mutations are not equal
			return codon1.compareTo(codon2);
		}
        
        /*
         * amino acid collections need to be translated into a sorted character set so
         * duplicate amino acids can be removed, and so they can be easily evaluated
         */
        SortedSet aminoAcidsSet1 = stringToSortedCharacterSet(matcher1.group(AMINO_ACIDS_GROUP));
        SortedSet aminoAcidsSet2 = stringToSortedCharacterSet(matcher2.group(AMINO_ACIDS_GROUP));
		
		Collection intersection=CollectionUtils.intersection(aminoAcidsSet1, aminoAcidsSet2);
		if(!this.strictComparision) {	
			if (intersection.size()>0) {
				// NOT strictComparison and the two have at least one acid in common, therefore they are equal
				return 0;
			}
		} else {
			// find the smallest amino acid set size
			int minSize = ((aminoAcidsSet1.size() <= aminoAcidsSet2.size()) ? aminoAcidsSet1 : aminoAcidsSet2).size();
			if (intersection.size() >= minSize) {
			    // strictComparison and the smaller amino acid set is a subset of the other, therefore they are equal 
				return 0;
			}
		}
        
		return aminoAcidsSet1.toString().compareTo(aminoAcidsSet2.toString());
	}

	/**
     * Return the String representation of this codon, amino acid collection pair.
     * 
     * @param codonNumber an Object to represent the codon number
     * @param aminoAcidCollection a Collection to represent the amino acid collection
     * @return a String representation of the mutation
	 * @see org.fstrf.stanfordAsiInterpreter.resistance.grammar.MutationComparator#createMutation(java.lang.Object, java.util.Collection)
	 */
	public Object createMutation(Object codonNumber, Collection aminoAcidCollection)
        throws IllegalArgumentException
    {
        StringBuffer mutation = new StringBuffer(codonNumber.toString().trim());
        for(Iterator iter = aminoAcidCollection.iterator(); iter.hasNext();)
        {
            mutation.append(iter.next().toString().trim());
        }
        
        if(!MUTATION_PATTERN.matcher(mutation.toString()).matches())
        {
            throw new IllegalArgumentException("Invalid createMutation paramters: " 
                + codonNumber + ", " + aminoAcidCollection);
        }
        
        return mutation.toString();
	 }
    
    /**
     * Return this String mutation with its amino acid list inverted.
     * 
     * e.g. 41LF -&gt; 41ACDEGHIKMNPQRSTVWYZdi
     * 
     * @param mutation the String mutation to invert
     * @return a String representation of an inverted mutation
     * 
     * @see org.fstrf.stanfordAsiInterpreter.resistance.grammar.MutationComparator#invertMutation(java.lang.Object)
     */
    public Object invertMutation(Object mutation)
        throws IllegalArgumentException
    {
        Matcher matcher = MUTATION_PATTERN.matcher(mutation.toString());
        if(!matcher.find())
        {
            throw new IllegalArgumentException("Invalid invertMutation paramter: " + mutation);
        }
        
        SortedSet foundAcids = stringToSortedCharacterSet(matcher.group(AMINO_ACIDS_GROUP));
        Collection notFoundAcids = CollectionUtils.subtract(AMINO_ACIDS_SET, foundAcids);
        
        return matcher.group(CODON_GROUP) + collectionToString(notFoundAcids);
    }
    
    public boolean isMutationValid(Object mutation) {
    	return MUTATION_PATTERN.matcher(mutation.toString()).matches();
    }
    
    public boolean areMutationsValid(List mutations) {
    	for(Iterator iterator = mutations.iterator(); iterator.hasNext();) {
			if(!isMutationValid(iterator.next())) {
				return false;
			}
		}
    	return true;
    }
}
