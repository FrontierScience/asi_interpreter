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

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.fstrf.stanfordAsiInterpreter.resistance.ASIEvaluationException;
import org.fstrf.stanfordAsiInterpreter.resistance.ASIParsingException;
import org.fstrf.stanfordAsiInterpreter.resistance.AsiTransformer;
import org.fstrf.stanfordAsiInterpreter.resistance.definition.Gene;
import org.fstrf.stanfordAsiInterpreter.resistance.evaluate.EvaluatedGene;
import org.fstrf.stanfordAsiInterpreter.resistance.grammar.MutationComparator;
import org.fstrf.stanfordAsiInterpreter.resistance.grammar.StringMutationComparator;
import org.fstrf.stanfordAsiInterpreter.resistance.xml.JsXmlAsiTransformer;

import com.google.common.base.Strings;

import elemental2.core.JsArray;
import jsinterop.annotations.JsPackage;
import jsinterop.annotations.JsProperty;
import jsinterop.annotations.JsType;

@JsType(name = "default", namespace = JsPackage.GLOBAL)
public class ASIJs {

    private final String xmlString;
    private final Map<String, Gene> genes;

    @JsProperty
    private final Map<String, Map<String, ?>> algorithmInfo;

    public ASIJs(String xmlString) throws ASIParsingException {
        this.xmlString = xmlString;
        AsiTransformer transformer = new JsXmlAsiTransformer();
        genes = transformer.transform(xmlString);
        algorithmInfo = transformer.getAlgorithmInfo(xmlString);
    }

    public String getXMLString() {
        return xmlString;
    }

    public Map<String, Gene> getTransformResults() {
        return genes;
    }

    public Object getAlgorithmInfo() {
        return JsObjectify.of(algorithmInfo);
    }

    public Object evaluate(JsArray<String> mutations) throws ASIEvaluationException {
        List<String> mutList = mutations.asList();
        Map<String, List<String>> mutsByGene = mutList.stream().map(mut -> mut.split(":", 2))
                .collect(Collectors.groupingBy(mut -> mut[0], LinkedHashMap::new,
                        Collectors.mapping(mut -> mut.length > 1 ? mut[1] : "", Collectors.toList())));
        List<EvaluatedGene> geneResults = new ArrayList<>();
        List<String> invalidMutations = new ArrayList<>();
        MutationComparator<String> mutationComparator = new StringMutationComparator(false);

        for (Map.Entry<String, List<String>> entry : mutsByGene.entrySet()) {
            String geneName = entry.getKey();
            List<String> geneMuts = entry.getValue();
            Gene gene = genes.get(geneName);
            for (String mut : geneMuts) {
                if (gene == null || !mutationComparator.isMutationValid(mut)) {
                    invalidMutations.add("'" + geneName + (mut == "" ? "" : ":" + mut) + "'");
                }
            }
            if (gene != null && invalidMutations.isEmpty()) {
                geneResults.add(gene.evaluate(geneMuts, mutationComparator));
            }
        }
        if (!invalidMutations.isEmpty()) {
            throw new ASIEvaluationException(
                    Strings.lenientFormat("Invalid mutations: %s", String.join(", ", invalidMutations)));
        }
        return JsObjectify.of(geneResults);
    }

}