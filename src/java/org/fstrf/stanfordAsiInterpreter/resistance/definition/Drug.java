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

public class Drug {
	
	private String name;
	private String fullName;
	/*
	 * collection of DrugRule objects
	 */
	private List drugRules;
	
	public Drug(String drugName, String drugFullName, List drugRules) {
		this.fullName = drugFullName;
		this.name = drugName;
		this.drugRules = drugRules;
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
	
	public EvaluatedDrug evaluate(List mutations, MutationComparator comparator) throws ASIEvaluationException {
		Collection evaluatedConditions = new ArrayList();
		for(Iterator iter = this.drugRules.iterator(); iter.hasNext();) {
			Rule rule = (Rule) iter.next();
			evaluatedConditions.add(rule.evaluate(mutations, comparator));
		}
		return new EvaluatedDrug(this, evaluatedConditions);
	}
	
	public String toString() {
		return this.name;
	}
}
