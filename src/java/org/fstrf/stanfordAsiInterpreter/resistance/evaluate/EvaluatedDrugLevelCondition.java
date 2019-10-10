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

package org.fstrf.stanfordAsiInterpreter.resistance.evaluate;

import java.text.MessageFormat;

import org.fstrf.stanfordAsiInterpreter.resistance.definition.DrugLevelCondition;
import org.fstrf.stanfordAsiInterpreter.resistance.definition.LevelDefinition;

public class EvaluatedDrugLevelCondition {

	private static final MessageFormat FORMAT =
			new MessageFormat("{0}drug: {1},{0}level condition: {2},{0}result: {3},{0}scored level: {4}");

	private String drugName;
	private DrugLevelCondition drugLevelCondition;
	private Boolean evaluationResult;
	private LevelDefinition scoredLevel;


	public EvaluatedDrugLevelCondition(DrugLevelCondition drugLevelCondition,boolean evaluationResult,LevelDefinition level,String drugName){
		this.drugLevelCondition = drugLevelCondition;
		this.evaluationResult = evaluationResult;
		this.scoredLevel = level;
		this.drugName = drugName;
	}

	public DrugLevelCondition getDrugLevelCondition(){
		return this.drugLevelCondition;
	}

	public Boolean getResult(){
		return this.evaluationResult;
	}

	public LevelDefinition getScoredLevel(){
		return this.scoredLevel;
	}

	public String getDrug(){
		return this.drugName;
	}

	@Override
	public String toString() {
		Object[] objs = { "\n\t\t", this.drugName,this.drugLevelCondition, this.evaluationResult,this.scoredLevel };
		return FORMAT.format(objs);
	}
}