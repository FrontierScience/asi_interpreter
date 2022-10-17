/**
Copyright 2022 Stanford HIVDB team

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
package org.fstrf.stanfordAsiInterpreter.resistance.client;

import java.util.Collection;
import java.util.Map;
import java.util.stream.Collectors;

import org.fstrf.stanfordAsiInterpreter.resistance.definition.CommentDefinition;
import org.fstrf.stanfordAsiInterpreter.resistance.definition.Definition;
import org.fstrf.stanfordAsiInterpreter.resistance.definition.Drug;
import org.fstrf.stanfordAsiInterpreter.resistance.definition.LevelDefinition;
import org.fstrf.stanfordAsiInterpreter.resistance.definition.ResultCommentRule;
import org.fstrf.stanfordAsiInterpreter.resistance.evaluate.EvaluatedCondition;
import org.fstrf.stanfordAsiInterpreter.resistance.evaluate.EvaluatedDrug;
import org.fstrf.stanfordAsiInterpreter.resistance.evaluate.EvaluatedDrugClass;
import org.fstrf.stanfordAsiInterpreter.resistance.evaluate.EvaluatedGene;
import org.fstrf.stanfordAsiInterpreter.resistance.evaluate.EvaluatedResultCommentRule;
import org.fstrf.stanfordAsiInterpreter.resistance.grammar.AsiGrammarAdapter.ScoredItem;
import org.fstrf.stanfordAsiInterpreter.resistance.grammar.AsiGrammarEvaluator;

import elemental2.core.JsArray;
import jsinterop.base.JsPropertyMap;

public class JsObjectify {

    private final static JsPropertyMap<Object> toJsPropertyMap(Map<?, ?> input) {
        JsPropertyMap<Object> jsmap = JsPropertyMap.of();

        for (Map.Entry<?, ?> entry : input.entrySet()) {
            String key = entry.getKey().toString();
            Object val = of(entry.getValue());
            jsmap.set(key, val);
        }

        return jsmap;
    }

    private final static JsArray<Object> toJsArray(Collection<?> input) {
        return new JsArray<>(input.stream().map(val -> of(val)).toArray());
    }

    public final static Object of(Object input) {
        if (input instanceof Map) {
            return toJsPropertyMap((Map<?, ?>) input);
        } else if (input instanceof Collection) {
            return toJsArray((Collection<?>) input);
            // Only double values are represented correctly
            // TODO: figure out why
        } else if (input instanceof Integer) {
            return ((Integer) input).doubleValue();
        } else if (input instanceof Float) {
            return ((Float) input).doubleValue();
        } else if (input instanceof Long) {
            return ((Long) input).doubleValue();
        } else if (input instanceof Double) {
            return ((Double) input).doubleValue();
        } else if (input instanceof LevelDefinition) {
            return toJsPropertyMap((LevelDefinition) input);
        } else if (input instanceof CommentDefinition) {
            return toJsPropertyMap((CommentDefinition) input);
        } else if (input instanceof Definition) {
            return toJsPropertyMap((Definition) input);
        } else if (input instanceof EvaluatedDrug) {
            return toJsPropertyMap((EvaluatedDrug) input);
        } else if (input instanceof EvaluatedDrugClass) {
            return toJsPropertyMap((EvaluatedDrugClass) input);
        } else if (input instanceof ScoredItem) {
            return toJsPropertyMap((ScoredItem) input);
        } else if (input instanceof EvaluatedCondition) {
            return toJsPropertyMap((EvaluatedCondition) input);
        } else if (input instanceof EvaluatedGene) {
            return toJsPropertyMap((EvaluatedGene) input);
        } else if (input instanceof EvaluatedResultCommentRule) {
            return toJsPropertyMap((EvaluatedResultCommentRule) input);
        }

        return input;
    }

    private final static JsPropertyMap<Object> toJsPropertyMap(LevelDefinition level) {
        if (level == null) {
            return null;
        }
        JsPropertyMap<Object> levelResult = JsPropertyMap.of();
        levelResult.set("order", level.getOrder().doubleValue());
        levelResult.set("SIR", level.getSir());
        levelResult.set("text", level.getText());
        return levelResult;
    }

    private final static JsPropertyMap<Object> toJsPropertyMap(CommentDefinition cmt) {
        if (cmt == null) {
            return null;
        }
        JsPropertyMap<Object> cmtResult = JsPropertyMap.of();
        cmtResult.set("id", cmt.getId());
        cmtResult.set("sort", cmt.getSort().doubleValue());
        cmtResult.set("text", cmt.getText());
        return cmtResult;
    }

    private final static JsPropertyMap<Object> toJsPropertyMap(Definition def) {
        if (def == null) {
            return null;
        }
        JsPropertyMap<Object> defResult;
        if (def instanceof LevelDefinition) {
            defResult = toJsPropertyMap((LevelDefinition) def);
        } else if (def instanceof CommentDefinition) {
            defResult = toJsPropertyMap((CommentDefinition) def);
        } else {
            defResult = JsPropertyMap.of();
        }
        return defResult;
    }

    private final static JsPropertyMap<Object> toJsPropertyMap(EvaluatedResultCommentRule resultComment) {
        if (resultComment == null) {
            return null;
        }
        JsPropertyMap<Object> cmtResult = JsPropertyMap.of();
        cmtResult.set("result", resultComment.getResult());
        cmtResult.set("definitions", toJsArray(resultComment.getDefinitions()));
        ResultCommentRule rule = resultComment.getResultCommentRule();
        cmtResult.set("levelConditions",
                toJsArray(rule.getConditions().stream().map(cond -> cond.toString()).collect(Collectors.toList())));
        return cmtResult;
    }

    private final static JsPropertyMap<Object> toJsPropertyMap(EvaluatedDrug evalDrug) {
        if (evalDrug == null) {
            return null;
        }
        JsPropertyMap<Object> drugResult = JsPropertyMap.of();
        Drug drug = evalDrug.getDrug();

        drugResult.set("drugName", drug.getDrugName());
        drugResult.set("drugFullName", drug.getDrugFullName());
        drugResult.set("highestLevel", toJsPropertyMap(evalDrug.getHighestLevelDefinition()));
        drugResult.set("levels", toJsArray(evalDrug.getLevelDefinitions()));
        drugResult.set("conditions", toJsArray(evalDrug.getEvaluatedConditions()));
        return drugResult;
    }

    private final static JsPropertyMap<Object> toJsPropertyMap(EvaluatedDrugClass evalDC) {
        if (evalDC == null) {
            return null;
        }
        JsPropertyMap<Object> dcResult = JsPropertyMap.of();
        dcResult.set("drugClassName", evalDC.getDrugClass().getClassName());
        dcResult.set("drugs", toJsArray(evalDC.getEvaluatedDrugs()));
        return dcResult;
    }

    private final static JsPropertyMap<Object> toJsPropertyMap(ScoredItem item) {
        if (item == null) {
            return null;
        }
        JsPropertyMap<Object> itemResult = JsPropertyMap.of();
        itemResult.set("mutations", toJsArray(item.getMutations()));
        itemResult.set("value", item.getValue());
        itemResult.set("score", item.getScore());
        return itemResult;
    }

    private final static JsPropertyMap<Object> toJsPropertyMap(EvaluatedCondition evalCond) {
        if (evalCond == null) {
            return null;
        }
        JsPropertyMap<Object> condResult = JsPropertyMap.of();
        AsiGrammarEvaluator evaluator = evalCond.getEvaluator();
        condResult.set("result", evaluator.getResult());
        condResult.set("statement", evalCond.getRuleCondition().getStatement());
        condResult.set("scoredMutations", toJsArray(evaluator.getScoredMutations()));
        condResult.set("scoredItems", toJsArray(evaluator.getScoredItems()));
        condResult.set("definitions", toJsArray(evalCond.getDefinitions()));
        return condResult;
    }

    private final static JsPropertyMap<Object> toJsPropertyMap(EvaluatedGene evalGene) {
        if (evalGene == null) {
            return null;
        }
        JsPropertyMap<Object> geneResult = JsPropertyMap.of();
        geneResult.set("geneName", evalGene.getGene().getName());
        geneResult.set("drugClasses", toJsArray(evalGene.getEvaluatedDrugClasses()));
        geneResult.set("mutationComments", toJsArray(evalGene.getGeneCommentDefinitions()));
        geneResult.set("resultComments", toJsArray(evalGene.getEvaluatedResultCommentRules()));
        geneResult.set("scoredMutations", toJsArray(evalGene.getGeneScoredMutations()));
        return geneResult;
    }

}
