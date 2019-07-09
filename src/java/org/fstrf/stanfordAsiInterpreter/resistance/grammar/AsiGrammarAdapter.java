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


public class AsiGrammarAdapter extends DepthFirstAdapter implements AsiGrammarEvaluator
{
	/**
	 * An Integer value representing true
	 */
	public static final Double TRUE_VALUE = new Double(1);
    
    /**
     * An Integer value representing false
     */
    public static final Double FALSE_VALUE = new Double(0);
    
    private static final Double NOT_SCORED = new Double(Double.NaN);
    
    private Stack stack;
    private Set allScoredMutations;
    private Set scoredItemMutations;
    private Collection scoredItems;
	private MutationComparator comparator;
	private List mutationList;
	private boolean isBooleanResult;
	
	/**
     * Create an Adapter class that can be applied to an AsiGrammar tree.  After applying
     * this adapter, it can return the evaluated result via the getResult method.
     * 
	 * @param mutationList the mutation list to compare against
	 * @param comparator the comparator used to determine whether or not mutations are equal
	 */
	public AsiGrammarAdapter(List mutationList, MutationComparator comparator)
    {
        this.stack = new Stack();
        this.allScoredMutations = new HashSet();
        this.scoredItemMutations = new HashSet();
        this.scoredItems = new ArrayList();
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
	public Object getResult() {
		Double score = (Double) this.stack.peek();
		if(this.isBooleanResult) {
			return new Boolean(score.equals(TRUE_VALUE));
		} else {
			return score;
		}
	}
	
	public Set getScoredMutations() {
		return this.allScoredMutations;
	}
	
	public Collection getScoredItems() {
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
	public void caseAResidueResidue(AResidueResidue node)
    {
        super.caseAResidueResidue(node);
        Object residue = this.comparator.createMutation(node.getInteger(), node.getMutatedaminoacid());
        int index = Collections.binarySearch(this.mutationList, residue, this.comparator);
        if(index >= 0) {
        	this.stack.push(TRUE_VALUE);
        	Object mutation = this.mutationList.get(index);
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
    public void caseAResiduenotResidue(AResiduenotResidue node)
    {
        super.caseAResiduenotResidue(node);
        
        //Set mutations = new HashSet();
        boolean foundMutation = false;
        Iterator iterator = node.getMutatedaminoacid().iterator();
        while (iterator.hasNext()) {
			
			Object mutatedAminoacid = (Object) iterator.next();
			Collection mutatedAminoacidList = new HashSet();
			mutatedAminoacidList.add(mutatedAminoacid);
			
			Object residue = this.comparator.createMutation(node.getInteger(), mutatedAminoacidList);   
			
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
    public void caseAResidueinvertResidue(AResidueinvertResidue node)
    {
        super.caseAResidueinvertResidue(node);
        Object residue = this.comparator.createMutation(node.getInteger(), node.getMutatedaminoacid());
        residue = this.comparator.invertMutation(residue);
        int index = Collections.binarySearch(this.mutationList, residue, this.comparator);
        if(index >= 0) {
        	this.stack.push(TRUE_VALUE);
        	Object mutation = this.mutationList.get(index);
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
	public void caseASelectlist(ASelectlist node)
    {
        super.caseASelectlist(node);
        /**
         * The size of the select list is going to be one (as there must always be 
         * at least one residue) plus the size of the optional trailing residue list.
         */
        this.stack.push(new Double(this.sumValuesFromStack(node.getListitems().size() + 1)));
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
		this.stack.push(new Double(value));
	}
    
	/**
     * If the score item's residue has evaluated to TRUE, push on the score associated
     * with this item, otherwise push on a score of 0.
     * 
	 * Node: e.g. 41L =&gt; -45
	 * 
	 * @see org.fstrf.stanfordAsiInterpreter.resistance.grammar.analysis.DepthFirstAdapter#caseAStatementScoreitem(org.fstrf.stanfordAsiInterpreter.resistance.grammar.node.AStatementScoreitem)
	 */
    public void caseAStatementScoreitem(AStatementScoreitem node)
    {
    	super.caseAStatementScoreitem(node);
    	double value = ((Double) this.stack.pop()).doubleValue();
        if(value != FALSE_VALUE.doubleValue()) {
        	double number = Double.parseDouble(node.getNumber().toString());
        	Double score = (node.getMin() == null) ? new Double(number) : new Double(number*-1);
            this.stack.push(score);
            this.scoredItems.add(new ScoredItem(node.toString(), this.scoredItemMutations, score));
        }
        else {
        	this.stack.push(new Double(Double.NaN));
        }
        this.scoredItemMutations = new HashSet();
    }
    
    /**
     * If the residue was found in the mutation list, push FALSE onto the Stack,
     * otherwise push TRUE (i.e. just invert the truth value on top of the Stack)
     * 
     * @see org.fstrf.stanfordAsiInterpreter.resistance.grammar.analysis.DepthFirstAdapter#caseAExcludestatement(org.fstrf.stanfordAsiInterpreter.resistance.grammar.node.AExcludestatement)
     */
    public void caseAExcludestatement(AExcludestatement node)
    {
        super.caseAExcludestatement(node);
        
        int inverted = ((Double) this.stack.pop()).intValue() ^ TRUE_VALUE.intValue();
        this.stack.push(new Double(inverted));
    }
    
    /**
     * Evaluate the top 2 conditions on the Stack using the logic symbol provided, then push
     * the resulting truth value back onto the Stack.
     * 
     * @see org.fstrf.stanfordAsiInterpreter.resistance.grammar.analysis.DepthFirstAdapter#caseACondition2(org.fstrf.stanfordAsiInterpreter.resistance.grammar.node.ACondition2)
     */
    public void caseACondition2(ACondition2 node)
    {
        super.caseACondition2(node);
        
        int first = ((Double) this.stack.pop()).intValue();
        int second = ((Double) this.stack.pop()).intValue();
        
        if(node.getLogicsymbol() instanceof AAndLogicsymbol)  
        {
            this.stack.push(new Double(first & second));
        } else if(node.getLogicsymbol() instanceof AOrLogicsymbol)
        {
            this.stack.push(new Double(first | second));
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
            Double value = (new Double(this.stack.pop().toString()));
            if (!(value.equals(NOT_SCORED))){
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
    		Double value = (new Double(this.stack.pop().toString()));
    		if( !(value.equals(NOT_SCORED)) && value.doubleValue() > max ) {
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
    	private Set mutations;
    	private Double score;
    	 
    	public ScoredItem(String value, Set mutations, Double score) {
    		this.value = value;
    		this.mutations = mutations;
    		this.score = score;
    	}
    	
    	public String getValue() {
    		return this.value;
    	}
    	
    	public Set getMutations() {
    		return this.mutations;
    	}
    	
    	public Double getScore() {
    		return this.score;
    	}
    	
    	public String toString() {
    		return this.value;
    	}
    }
}