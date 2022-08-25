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
package org.fstrf.stanfordAsiInterpreter.resistance.xml;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.fstrf.stanfordAsiInterpreter.resistance.ASIParsingException;
import org.fstrf.stanfordAsiInterpreter.resistance.definition.Gene;
import org.fstrf.stanfordAsiInterpreter.resistance.xml.jsdom.DOMParser;
import org.fstrf.stanfordAsiInterpreter.resistance.xml.jsdom.XPathEvaluator;

import elemental2.dom.Node;
import elemental2.dom.XPathResult;

public class JsXmlAsiTransformer extends BaseXmlAsiTransformer<Node> {

    private static final XPathEvaluator XPATH_EVALUATOR = new XPathEvaluator();

    @Override
    protected List<Node> queryNodes(Node parent, String xpath) {
        XPathResult result = XPATH_EVALUATOR.evaluate(xpath, parent);
        List<Node> nodes = new ArrayList<>();
        Node child;
        do {
            child = result.iterateNext();
            if (child == null) {
                break;
            }
            nodes.add(child);
        } while (true);

        return nodes;
    }

    @Override
    protected Node querySingleNode(Node parent, String xpath) {
        List<Node> nodes = queryNodes(parent, xpath);
        return nodes.size() == 0 ? null : nodes.get(0);
    }

    @Override
    protected Node queryUniqueSingleNode(Node parent, String xpath) throws ASIParsingException {
        List<Node> nodes = queryNodes(parent, xpath);
        if (nodes.size() > 1) {
            throw new ASIParsingException("multiple nodes " + xpath + " exist within parent: " + parent.textContent);
        }
        return (nodes.size() == 0) ? null : nodes.get(0);
    }

    @Override
    protected Node parseXml(String messageXml) throws ASIParsingException {
        Node doc = new DOMParser().parseFromString(messageXml, "application/xml");
        Node errorNode = doc.querySelector("parsererror");
        if (errorNode != null) {
            throw new ASIParsingException(errorNode.textContent);
        }
        doc.normalize();
        return doc;
    }

    @Override
    protected String getNodeText(Node node) {
        return node.textContent;
    }

    @Override
    public Map<String, Gene> transform(InputStream is) throws ASIParsingException {
        throw new UnsupportedOperationException("InputStream is not supported by ASIJs");
    }

    @Override
    public Map<String, Map<String, ?>> getAlgorithmInfo(InputStream is) throws ASIParsingException {
        throw new UnsupportedOperationException("InputStream is not supported by ASIJs");
    }

}
