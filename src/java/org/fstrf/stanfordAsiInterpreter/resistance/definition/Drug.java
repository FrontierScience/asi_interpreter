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

import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;

import org.fstrf.stanfordAsiInterpreter.resistance.ASIEvaluationException;
import org.fstrf.stanfordAsiInterpreter.resistance.evaluate.EvaluatedDrug;
import org.fstrf.stanfordAsiInterpreter.resistance.grammar.MutationComparator;


/**
 * Class defining a drug, retrieved from the DRUG tag in the algorithm file.
 * Can contain any number of <code>mutationTypes</code>, consisting of a name and a list of mutations. Encountered mutations are output along with the mutation type name.
 * Must contain a <code>defaultLevel</code>. If no rules trigger for this drug, it will default to this resistance level.
 */
@SuppressWarnings("all") public class Drug {

	private String name;
	private String fullName;
	/*
	 * collection of DrugRule objects
	 */
	private List drugRules;
    private List<MutationType> mutationTypes;
    private int defaultLevel;

	public Drug(String drugName, String drugFullName, List drugRules, List<MutationType> mutationTypes, int defaultLevel) {
		this.fullName = drugFullName;
		this.name = drugName;
		this.drugRules = drugRules;
		this.mutationTypes = mutationTypes;
		this.defaultLevel = defaultLevel;
	}

	public String getDrugName() {
		return this.name;
	}

	public String getDrugFullName() {
		return this.fullName;
	}

	public List getDrugRules() {
		return this.drugRules;
	}

    public List<MutationType> getMutationTypes() {
        return this.mutationTypes;
    }

    public void setMutationType(List<MutationType> mt) {
        this.mutationTypes = mt;
    }

    public int getDefaultLevel() {
        return this.defaultLevel;
    }


    /**
     * Evaluates the drug based on the given rules and mutations.
     */
	public EvaluatedDrug evaluate(List mutations, MutationComparator comparator) throws ASIEvaluationException {
		Collection evaluatedConditions = new ArrayList();
		for(Iterator iter = this.drugRules.iterator(); iter.hasNext();) {
			Rule rule = (Rule) iter.next();
			evaluatedConditions.add(rule.evaluate(mutations, comparator));
		}
		List<MutationType> evaluatedMutationTypes = new ArrayList<MutationType>();
		if(this.mutationTypes != null) {
		    for(MutationType mutationType : this.mutationTypes) {
		        List<String> evaluatedMutations = new ArrayList<String>();
        		for(Object m : mutations) {
        		    if(mutationType.getMutations().contains(m)) {
        		        evaluatedMutations.add((String) m);
        		    }
        		}
                MutationType mt = new MutationType(mutationType.getName(), evaluatedMutations);
                evaluatedMutationTypes.add(mt);
		    }
		}
		this.setMutationType(evaluatedMutationTypes);
		return new EvaluatedDrug(this, evaluatedConditions, this.defaultLevel);
	}

	@Override
    public String toString() {
		return this.name;
	}
}
