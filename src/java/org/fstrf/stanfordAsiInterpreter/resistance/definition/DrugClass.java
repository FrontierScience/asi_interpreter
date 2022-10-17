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
import java.util.List;
import java.util.Set;

import org.fstrf.stanfordAsiInterpreter.resistance.ASIEvaluationException;
import org.fstrf.stanfordAsiInterpreter.resistance.evaluate.EvaluatedDrug;
import org.fstrf.stanfordAsiInterpreter.resistance.evaluate.EvaluatedDrugClass;
import org.fstrf.stanfordAsiInterpreter.resistance.grammar.MutationComparator;

public class DrugClass {

	private String name;
	private Set<Drug> drugs;

	public DrugClass(String name, Set<Drug> drugs) {
		this.name = name;
		this.drugs = drugs;
	}

	public String getClassName() {
		return this.name;
	}

	public Set<Drug> getDrugs() {
		return this.drugs;
	}

	@Override
    public String toString() {
		return this.name;
	}

	public <T extends MutationComparator<String>> EvaluatedDrugClass evaluate(List<String> mutations, T comparator) throws ASIEvaluationException {
		ArrayList<EvaluatedDrug> evaluatedDrugs = new ArrayList<>();
		for(Drug drug : drugs) {
			evaluatedDrugs.add(drug.evaluate(mutations, comparator));
		}
		return new EvaluatedDrugClass(this, evaluatedDrugs);
	}
}
