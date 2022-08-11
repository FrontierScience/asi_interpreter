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
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.fstrf.stanfordAsiInterpreter.resistance.ASIEvaluationException;
import org.fstrf.stanfordAsiInterpreter.resistance.evaluate.EvaluatedCondition;
import org.fstrf.stanfordAsiInterpreter.resistance.evaluate.EvaluatedDrug;
import org.fstrf.stanfordAsiInterpreter.resistance.evaluate.EvaluatedDrugClass;
import org.fstrf.stanfordAsiInterpreter.resistance.evaluate.EvaluatedGene;
import org.fstrf.stanfordAsiInterpreter.resistance.evaluate.EvaluatedResultCommentRule;
import org.fstrf.stanfordAsiInterpreter.resistance.grammar.MutationComparator;

public class Gene {

    private String name;

    //drugClassList of DrugClass objects
    private Set<DrugClass> drugClasses;
    private List<Rule> geneRules;
    private List<ResultCommentRule> resultCommentRules;
    private IndelRangeDefinition indelRange;
    private int defaultLevel;

    public Gene(String name, Set<DrugClass> drugClasses, List<Rule> geneRules, List<ResultCommentRule> resultCommentRules, IndelRangeDefinition indelRange, int defaultLevel) {
        this.name = name;
        this.drugClasses = drugClasses;
        this.geneRules = geneRules;
        this.resultCommentRules = resultCommentRules;
        this.indelRange = indelRange;
        this.defaultLevel = defaultLevel;
    }

    public Gene(String name, Set<DrugClass> drugClasses, List<Rule> geneRules, List<ResultCommentRule> resultCommentRules, IndelRangeDefinition indelRange) {
        this(name, drugClasses, geneRules, resultCommentRules, indelRange, 0);
    }

    public Gene(String name, Set<DrugClass> drugClasses, List<Rule> geneRules, List<ResultCommentRule> resultCommentRules) {
        this(name, drugClasses, geneRules, resultCommentRules, null);
    }

    public Gene(String name, Set<DrugClass> drugClasses, List<Rule> geneRules) {
        this(name, drugClasses, geneRules, new ArrayList<ResultCommentRule>());
    }

    public Gene(String name, Set<DrugClass> drugClasses, IndelRangeDefinition indelRange) {
        this(name, drugClasses, new ArrayList<>(), new ArrayList<ResultCommentRule>(), indelRange);
    }

    public Gene(String name, Set<DrugClass> drugClasses) {
        this(name, drugClasses, new ArrayList<>());
    }

    public Gene(String name, List<Rule> geneRules) {
        this(name, new HashSet<>(), geneRules);
    }

    public String getName() {
        return this.name;
    }

    public Set<DrugClass> getDrugClasses() {
        return this.drugClasses;
    }

    public List<Rule> getRules() {
        return this.geneRules;
    }

    public IndelRangeDefinition getIndelRangeDefinition() {
        return this.indelRange;
    }

    public int getDefaultLevel() {
        return this.defaultLevel;
    }

    @Override
    public String toString() {
        return this.name;
    }

    /**
     * Evaluates the mutations given in the mutations argument against the logic
     *
     * @param mutations
     * @param comparator
     * @return
     * @throws ASIEvaluationException
     */
    public <T extends MutationComparator<String>> EvaluatedGene evaluate(List<String> mutations, T comparator) throws ASIEvaluationException {
        List<String> updatedMutations = this.indelRange != null ? replaceMutationsInRange(mutations, this.indelRange) : mutations;
        Collection<EvaluatedCondition> evaluatedGeneRules = new ArrayList<>();
        for (Rule geneRule : geneRules) {
            evaluatedGeneRules.add(geneRule.evaluate(updatedMutations, comparator));
        }

        Collection<EvaluatedDrugClass> evaluatedDrugClasses = new ArrayList<>();
        for (DrugClass drugClass : drugClasses) {
            evaluatedDrugClasses.add(drugClass.evaluate(updatedMutations, comparator));
        }

        // create a map of drug names to result level definitions for the result
        // comments
        Map<String, LevelDefinition> drugLevelResults = new HashMap<String, LevelDefinition>();
        for (Object evaluatedDrugClassObj : evaluatedDrugClasses) {
            EvaluatedDrugClass evaluatedDrugClass = (EvaluatedDrugClass) evaluatedDrugClassObj;
            for (Object evaluatedDrugObj : evaluatedDrugClass.getEvaluatedDrugs()) {
                EvaluatedDrug evaluatedDrug = (EvaluatedDrug) evaluatedDrugObj;
                LevelDefinition finalLevel = evaluatedDrug.getHighestLevelDefinition() != null ? evaluatedDrug.getHighestLevelDefinition()
                        : new LevelDefinition(evaluatedDrug.getDrug().getDefaultLevel(), "", "");
                drugLevelResults.put(evaluatedDrug.getDrug().getDrugName(), finalLevel);
            }
        }

        Collection<EvaluatedResultCommentRule> evaluatedResultComments = new ArrayList<EvaluatedResultCommentRule>();
        for (ResultCommentRule resultCommentRule : this.resultCommentRules) {
            evaluatedResultComments.add(resultCommentRule.evaluate(drugLevelResults));
        }

        return new EvaluatedGene(this, evaluatedGeneRules, evaluatedDrugClasses, evaluatedResultComments);
    }

    /**
     * For all mutations in the given list that appear in the given indel range input, replaces it with the indel range output
     *
     * @param mutationList the mutation list to update
     * @param indelRange the indel range that defines the mutation updates
     * @return the updated mutation list
     */
    private static List<String> replaceMutationsInRange(List<String> mutationList, IndelRangeDefinition indelRange)
    {
        List<String> res = new ArrayList<>();

        for(Object o : mutationList) {
            String mut = o.toString();
            if(indelRange.getInput().contains(mut)){
                res.add(indelRange.getOutput());
            }
            else {
                res.add(mut);
            }
        }

        return res;
    }
}