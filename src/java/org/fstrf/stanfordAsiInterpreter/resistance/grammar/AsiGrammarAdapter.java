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

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;
import java.util.Stack;

import org.fstrf.stanfordAsiInterpreter.resistance.grammar.analysis.DepthFirstAdapter;
import org.fstrf.stanfordAsiInterpreter.resistance.grammar.node.AAndLogicsymbol;
import org.fstrf.stanfordAsiInterpreter.resistance.grammar.node.AAtleastSelectstatement2;
import org.fstrf.stanfordAsiInterpreter.resistance.grammar.node.AAtleastnotmorethanSelectstatement2;
import org.fstrf.stanfordAsiInterpreter.resistance.grammar.node.ACondition2;
import org.fstrf.stanfordAsiInterpreter.resistance.grammar.node.AExactlySelectstatement2;
import org.fstrf.stanfordAsiInterpreter.resistance.grammar.node.AExcludestatement;
import org.fstrf.stanfordAsiInterpreter.resistance.grammar.node.AMaxScoreitem;
import org.fstrf.stanfordAsiInterpreter.resistance.grammar.node.ANotmorethanSelectstatement2;
import org.fstrf.stanfordAsiInterpreter.resistance.grammar.node.AOrLogicsymbol;
import org.fstrf.stanfordAsiInterpreter.resistance.grammar.node.AResidueResidue;
import org.fstrf.stanfordAsiInterpreter.resistance.grammar.node.AResidueinvertResidue;
import org.fstrf.stanfordAsiInterpreter.resistance.grammar.node.AResiduenotResidue;
import org.fstrf.stanfordAsiInterpreter.resistance.grammar.node.AScorelist;
import org.fstrf.stanfordAsiInterpreter.resistance.grammar.node.ASelectlist;
import org.fstrf.stanfordAsiInterpreter.resistance.grammar.node.AStatementScoreitem;
import org.fstrf.stanfordAsiInterpreter.resistance.grammar.node.TAminoAcid;

public class AsiGrammarAdapter<T extends MutationComparator<String>> extends DepthFirstAdapter implements AsiGrammarEvaluator
{
	/**
	 * An Integer value representing true
	 */
	public static final Double TRUE_VALUE = Double.valueOf(1);

    /**
     * An Integer value representing false
     */
    public static final Double FALSE_VALUE = Double.valueOf(0);

    private static final Double NOT_SCORED = Double.valueOf(Double.NaN);

    private Stack<Double> stack;
    private Set<String> allScoredMutations;
    private Set<String> scoredItemMutations;
    private Collection<ScoredItem> scoredItems;
	private T comparator;
	private List<String> mutationList;
	private boolean isBooleanResult;

	/**
     * Create an Adapter class that can be applied to an AsiGrammar tree.  After applying
     * this adapter, it can return the evaluated result via the getResult method.
     *
	 * @param mutationList the mutation list to compare against
	 * @param comparator the comparator used to determine whether or not mutations are equal
	 */
	public AsiGrammarAdapter(List<String> mutationList, T comparator)
    {
        this.stack = new Stack<>();
        this.allScoredMutations = new HashSet<>();
        this.scoredItemMutations = new HashSet<>();
        this.scoredItems = new ArrayList<>();
        this.mutationList = mutationList;
        this.comparator = comparator;
        this.isBooleanResult = true;
		Collections.sort(this.mutationList, this.comparator);
    }

	/**
     * After this Adapter has been applied to an AsiGrammar tree (i.e. meaning the grammar tree has
     * been evaluated according to the logic of this class).  You may invoke this function to
     * retrieve the score obtained.  If the statement was constructed to return a boolean value, then
     * this function will return TRUE_VALUE for true and FALSE_VALUE for false.  If the statement
     * was constructed to return a score, the exact numerical score will be returned.
     *
     * @return the score the AsiGrammar tree evaluated to
     *
	 * @see org.fstrf.stanfordAsiInterpreter.resistance.grammar.AsiGrammarEvaluator#getResult()
	 */
	@Override
    public Object getResult() {
		Double score = this.stack.peek();
		if(this.isBooleanResult) {
			return Boolean.valueOf(score.equals(TRUE_VALUE));
		} else {
			return score;
		}
	}

	@Override
    public Set<String> getScoredMutations() {
		return this.allScoredMutations;
	}

	@Override
    public Collection<ScoredItem> getScoredItems() {
		return this.scoredItems;
	}

    /**
     * The residue production is used for evaluating whether or not the specified
     * residue is IN the mutation list.  Given the two properties of the residue
     * node, amino acid list and codon number, create a mutation and compare it to
     * each element in the list. If the mutation IS found, push TRUE onto the
     * stack, otherwise push FALSE.
     *
     * @param node the residue node to be evaluated
     *
     * @see org.fstrf.stanfordAsiInterpreter.resistance.grammar.analysis.DepthFirstAdapter#caseAResidueResidue(org.fstrf.stanfordAsiInterpreter.resistance.grammar.node.AResidueResidue)
     */
	@Override
    public void caseAResidueResidue(AResidueResidue node)
    {
        super.caseAResidueResidue(node);
        String residue = this.comparator.createMutation(node.getInteger(), node.getMutatedaminoacid());
        int index = Collections.binarySearch(this.mutationList, residue, this.comparator);
        if(index >= 0) {
        	this.stack.push(TRUE_VALUE);
        	String mutation = this.mutationList.get(index);
        	this.allScoredMutations.add(mutation);
        	this.scoredItemMutations.add(mutation);
        } else {
        	this.stack.push(FALSE_VALUE);
        }
	}

    /**
     * The residue not production is used for evaluating whether or not the specified
     * NOT residue is IN the mutation list.  Given the two properties of the residue
     * node, amino acid list and codon number, create a mutation and compare it to
     * each element in the list. If the mutation is NOT found, push TRUE onto the
     * stack, otherwise push FALSE.
     *
     * @param node the residue node to be evaluated
     *
     * @see org.fstrf.stanfordAsiInterpreter.resistance.grammar.analysis.DepthFirstAdapter#caseAResiduenotResidue(org.fstrf.stanfordAsiInterpreter.resistance.grammar.node.AResiduenotResidue)
     *
     * e.g. NOT 41L
     */
    @Override
    public void caseAResiduenotResidue(AResiduenotResidue node)
    {
        super.caseAResiduenotResidue(node);

        //Set mutations = new HashSet();
        boolean foundMutation = false;
        Iterator<TAminoAcid> iterator = node.getMutatedaminoacid().iterator();
        while (iterator.hasNext()) {

			TAminoAcid mutatedAminoacid = iterator.next();
			Collection<TAminoAcid> mutatedAminoacidList = new HashSet<>();
			mutatedAminoacidList.add(mutatedAminoacid);

			String residue = this.comparator.createMutation(node.getInteger(), mutatedAminoacidList);

	        int index = Collections.binarySearch(this.mutationList, residue, this.comparator);
	        if(index < 0) {
	        	//mutations.add(residue.toString().trim());
	        } else{
	        	/** if at least one mutation is found than the whole expression will be evaluated to false **/
	        	foundMutation = true;
	        	break;
	        }
		}

        if(!foundMutation) {
        	this.stack.push(TRUE_VALUE);
        	this.allScoredMutations.add(node.toString().trim());
        	this.scoredItemMutations.add(node.toString().trim());
        } else {
        	this.stack.push(FALSE_VALUE);
        }

    }

    /**
     * The residue not production is used for evaluating whether or not the specified
     * NOT residue is IN the mutation list.  Given the two properties of the residue
     * node, amino acid list and codon number, create a mutation, invert it and compare it to
     * each element in the list. If the mutation is found, push TRUE onto the
     * stack, otherwise push FALSE.
     *
     * @param node the residue node to be evaluated
     *
     * @see org.fstrf.stanfordAsiInterpreter.resistance.grammar.analysis.DepthFirstAdapter#caseAResidueinvertResidue(org.fstrf.stanfordAsiInterpreter.resistance.grammar.node.AResidueinvertResidue)
     *
     * e.g. 41(NOT L)
     */
    @Override
    public void caseAResidueinvertResidue(AResidueinvertResidue node)
    {
        super.caseAResidueinvertResidue(node);
        String residue = this.comparator.createMutation(node.getInteger(), node.getMutatedaminoacid());
        residue = this.comparator.invertMutation(residue);
        int index = Collections.binarySearch(this.mutationList, residue, this.comparator);
        if(index >= 0) {
        	this.stack.push(TRUE_VALUE);
        	String mutation = this.mutationList.get(index);
        	this.allScoredMutations.add(mutation);
        	this.scoredItemMutations.add(mutation);
        } else {
        	this.stack.push(FALSE_VALUE);
        }
    }

	/**
     * The select list production is used to count how many items in the list evaluated
     * to TRUE. The function will iterate though this list, removing each individual
     * residue's truth value, and push on a total count of residues that evaluated to
     * TRUE.
     *
     * @param node the select list to be evaluated
     *
	 * @see org.fstrf.stanfordAsiInterpreter.resistance.grammar.analysis.DepthFirstAdapter#caseASelectlist(org.fstrf.stanfordAsiInterpreter.resistance.grammar.node.ASelectlist)
	 */
	@Override
    public void caseASelectlist(ASelectlist node)
    {
        super.caseASelectlist(node);
        /**
         * The size of the select list is going to be one (as there must always be
         * at least one residue) plus the size of the optional trailing residue list.
         */
        this.stack.push(Double.valueOf(this.sumValuesFromStack(node.getListitems().size() + 1)));
	}

    /**
     * On the top of stack is the value of how many elements are evaluated to TRUE.
     * It compares the top of stack with the EXACTLY attribute.
     * If comparison is evaluated to TRUE, push TRUE otherwise push FALSE.
     *
     * @param node the select list to be evaluated
     *
     * @see org.fstrf.stanfordAsiInterpreter.resistance.grammar.analysis.DepthFirstAdapter#caseAExactlySelectstatement2(org.fstrf.stanfordAsiInterpreter.resistance.grammar.node.AExactlySelectstatement2)
     */
    @Override
    public void caseAExactlySelectstatement2(AExactlySelectstatement2 node)
    {
        super.caseAExactlySelectstatement2(node);

        if(((Double) this.stack.pop()).doubleValue() == Double.parseDouble(node.getInteger().getText()))
        {
            this.stack.push(TRUE_VALUE);
        } else
        {
            this.stack.push(FALSE_VALUE);
        }
    }

	/**
	 * On the top of stack is the value of how many elements are evaluated to TRUE.
	 * It compares the top of stack with the ATLEAST attribute.
	 * If comparison is evaluated to TRUE, push TRUE otherwise push FALSE.
	 *
	 * @param node the select list to be evaluated
	 *
	 * @see org.fstrf.stanfordAsiInterpreter.resistance.grammar.analysis.DepthFirstAdapter#caseAAtleastSelectstatement2(org.fstrf.stanfordAsiInterpreter.resistance.grammar.node.AAtleastSelectstatement2)
	 */
    @Override
    public void caseAAtleastSelectstatement2(AAtleastSelectstatement2 node)
    {
        super.caseAAtleastSelectstatement2(node);

        if(((Double) this.stack.pop()).doubleValue() >= Double.parseDouble(node.getInteger().getText()))
        {
            this.stack.push(TRUE_VALUE);
        } else
        {
            this.stack.push(FALSE_VALUE);
        }
    }

    /**
     * On the top of stack is the value of how many elements are evaluated to TRUE.
     * It compares the top of stack with the NOTMORETHAN attribute.
     * If comparison is evaluated to TRUE, push TRUE otherwise push FALSE.
     *
     * @param node the select list to be evaluated
     *
     * @see org.fstrf.stanfordAsiInterpreter.resistance.grammar.analysis.DepthFirstAdapter#caseANotmorethanSelectstatement2(org.fstrf.stanfordAsiInterpreter.resistance.grammar.node.ANotmorethanSelectstatement2)
     */

    @Override
    public void caseANotmorethanSelectstatement2(ANotmorethanSelectstatement2 node)
    {
        super.caseANotmorethanSelectstatement2(node);

        if(((Double) this.stack.pop()).doubleValue() <= Double.parseDouble(node.getInteger().getText()))
        {
            this.stack.push(TRUE_VALUE);
        } else
        {
            this.stack.push(FALSE_VALUE);
        }
    }

    /**
     * On the top of stack is the value of how many elements are evaluated to TRUE.
     * It compares the top of stack with the ATLEAST attribute AND/OR the NOTMORETHAN attribute.
     * If comparison is evaluated to TRUE, push TRUE otherwise push FALSE.
     *
     * @param node the select list to be evaluated
     *
     * @see org.fstrf.stanfordAsiInterpreter.resistance.grammar.analysis.DepthFirstAdapter#caseAAtleastnotmorethanSelectstatement2(org.fstrf.stanfordAsiInterpreter.resistance.grammar.node.AAtleastnotmorethanSelectstatement2)
     */
    @Override
    public void caseAAtleastnotmorethanSelectstatement2(AAtleastnotmorethanSelectstatement2 node)
    {
        super.caseAAtleastnotmorethanSelectstatement2(node);

        int count = ((Double) this.stack.pop()).intValue();
        boolean isAtleast = count >= Double.parseDouble(node.getAtleastnumber().getText());
        boolean isNotmorethan = count <= Double.parseDouble(node.getNotmorethannumber().getText());

        if(node.getLogicsymbol() instanceof AAndLogicsymbol && (isAtleast && isNotmorethan) ||
                node.getLogicsymbol() instanceof AOrLogicsymbol && (isAtleast || isNotmorethan))
        {
            this.stack.push(TRUE_VALUE);
        } else
        {
            this.stack.push(FALSE_VALUE);
        }
    }

    /**
     * The score list production is used to sum the scores represented in the score list.
     * The function will iterate though this list, removing each individual score item's
     * value, and push on the summation.
     *
     * @param node the score list to be evaluated
     *
     * @see org.fstrf.stanfordAsiInterpreter.resistance.grammar.analysis.DepthFirstAdapter#caseAScorelist(org.fstrf.stanfordAsiInterpreter.resistance.grammar.node.AScorelist)
     */
	@Override
    public void caseAScorelist(AScorelist node)
    {
		super.caseAScorelist(node);
        /*
         * The size of the select list is going to be one (as there must always be
         * at least one residue) plus the size of the optional trailing residue list.
         *
         * If the score list is located within a MAX statement, then just find the max
         * value from the list, otherwise find the cumulative value.
         */
		this.isBooleanResult = false;
		int size = node.getScoreitems().size() + 1;
		double value = (node.parent() instanceof AMaxScoreitem) ? this.maxValueFromStack(size) : this.sumValuesFromStack(size);
		this.stack.push(Double.valueOf(value));
	}
	
	/**
     * If the score item's residue has evaluated to TRUE, push on the score associated
     * with this item, otherwise push on a score of 0.
     * 
	 * Node: e.g. 41L =&gt; -45
	 * 
	 * @see org.fstrf.stanfordAsiInterpreter.resistance.grammar.analysis.DepthFirstAdapter#caseAStatementScoreitem(org.fstrf.stanfordAsiInterpreter.resistance.grammar.node.AStatementScoreitem)
	 */
    @Override
    public void caseAStatementScoreitem(AStatementScoreitem node)
    {
    	super.caseAStatementScoreitem(node);
    	double value = ((Double) this.stack.pop()).doubleValue();
        if(value != FALSE_VALUE.doubleValue()) {
        	double number = Double.parseDouble(node.getNumber().toString());
        	Double score = (node.getMin() == null) ? Double.valueOf(number) : Double.valueOf(number*-1);
            this.stack.push(score);
            this.scoredItems.add(new ScoredItem(node.toString(), this.scoredItemMutations, score));
        }
        else {
        	this.stack.push(NOT_SCORED);
        }
        this.scoredItemMutations = new HashSet<>();
    }

    /**
     * If the residue was found in the mutation list, push FALSE onto the Stack,
     * otherwise push TRUE (i.e. just invert the truth value on top of the Stack)
     *
     * @see org.fstrf.stanfordAsiInterpreter.resistance.grammar.analysis.DepthFirstAdapter#caseAExcludestatement(org.fstrf.stanfordAsiInterpreter.resistance.grammar.node.AExcludestatement)
     */
    @Override
    public void caseAExcludestatement(AExcludestatement node)
    {
        super.caseAExcludestatement(node);

        int inverted = this.stack.pop().intValue() ^ TRUE_VALUE.intValue();
        this.stack.push(Double.valueOf(inverted));
    }

    /**
     * Evaluate the top 2 conditions on the Stack using the logic symbol provided, then push
     * the resulting truth value back onto the Stack.
     *
     * @see org.fstrf.stanfordAsiInterpreter.resistance.grammar.analysis.DepthFirstAdapter#caseACondition2(org.fstrf.stanfordAsiInterpreter.resistance.grammar.node.ACondition2)
     */
    @Override
    public void caseACondition2(ACondition2 node)
    {
        super.caseACondition2(node);

        int first = this.stack.pop().intValue();
        int second = this.stack.pop().intValue();

        if(node.getLogicsymbol() instanceof AAndLogicsymbol)
        {
            this.stack.push(Double.valueOf(first & second));
        } else if(node.getLogicsymbol() instanceof AOrLogicsymbol)
        {
            this.stack.push(Double.valueOf(first | second));
        } else
        {
            throw new RuntimeException("Logic symbol " + node.getLogicsymbol() + " was not expected.");
        }
    }

    /**
     * Pop off the next n items from the Stack, then return the cumulative value
     *
     * @param n the number of items to pop off the Stack
     * @return the cumulative value
     */
    private double sumValuesFromStack(int n) {
        double summation = 0;
        for(int i=0; i<n; i++) {
            Double value = (Double.valueOf(this.stack.pop().toString()));
            if (!Double.isNaN(value)) {
            	summation += value.doubleValue();
            }
        }
        return summation;
    }

    /**
     * Pop off the next n items from the Stack, then return the max value
     *
     * @param n the number of items to pop off the Stack
     * @return the max value
     */
    private double maxValueFromStack(int n) {
    	double max = Double.NEGATIVE_INFINITY;
    	for(int i=0; i<n; i++) {
    		Double value = (Double.valueOf(this.stack.pop().toString()));
    		if( !Double.isNaN(value) && value.doubleValue() > max ) {
    			max = value.doubleValue();
    		}
    	}
    	/*
    	 * if no score item fired than return 0
    	 */
    	return (max == Double.NEGATIVE_INFINITY)? 0 : max;
    }

    public static class ScoredItem {
    	private String value;
    	private Set<String> mutations;
    	private Double score;

    	public ScoredItem(String value, Set<String> mutations, Double score) {
    		this.value = value;
    		this.mutations = mutations;
    		this.score = score;
    	}

    	public String getValue() {
    		return this.value;
    	}

    	public Set<String> getMutations() {
    		return this.mutations;
    	}

    	public Double getScore() {
    		return this.score;
    	}

    	@Override
        public String toString() {
    		return this.value;
    	}
    }
}
