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

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.dom4j.DocumentException;
import org.dom4j.Node;
import org.dom4j.io.SAXReader;
import org.fstrf.stanfordAsiInterpreter.resistance.ASIParsingException;
import org.fstrf.stanfordAsiInterpreter.resistance.definition.Gene;
import org.xml.sax.EntityResolver;
import org.xml.sax.InputSource;

public class XmlAsiTransformer extends BaseXmlAsiTransformer<Node> {

    private static final EntityResolver RESOLVER = new EntityResolver() {
        @Override
        public InputSource resolveEntity(String publicId, String systemId) {
            if (systemId.endsWith("/ASI.dtd")) {
                InputStream in = getClass().getClassLoader().getResourceAsStream("dtd/ASI.dtd");
                return new InputSource(in);
            } else if (systemId.endsWith("/ASI2.dtd")) {
                InputStream in = getClass().getClassLoader().getResourceAsStream("dtd/ASI2.dtd");
                return new InputSource(in);
            } else if (systemId.endsWith("/ASI2.1.dtd")) {
                InputStream in = getClass().getClassLoader().getResourceAsStream("dtd/ASI2.1.dtd");
                return new InputSource(in);
            } else if (systemId.endsWith("/ASI2.2.dtd")) {
                InputStream in = getClass().getClassLoader().getResourceAsStream("dtd/ASI2.2.dtd");
                return new InputSource(in);
            } else if (systemId.endsWith("/ASI2.3.dtd")) {
                InputStream in = getClass().getClassLoader().getResourceAsStream("dtd/ASI2.3.dtd");
                return new InputSource(in);
            }
            return null;
        }
    };

    @Override
    public Map<String, Gene> transform(InputStream is) throws ASIParsingException {
        String messageXml = new BufferedReader(new InputStreamReader(is, StandardCharsets.UTF_8)).lines()
                .collect(Collectors.joining("\n"));
        return transform(messageXml);
    }

    @Override
    public Map<String, Map<String, ?>> getAlgorithmInfo(InputStream is) throws ASIParsingException {
        String messageXml = new BufferedReader(new InputStreamReader(is, StandardCharsets.UTF_8)).lines()
                .collect(Collectors.joining("\n"));
        return getAlgorithmInfo(messageXml);
    }

    private boolean validateXml;

    public XmlAsiTransformer(boolean validateXml) {
        this.validateXml = validateXml;
    }

    @Override
    protected List<Node> queryNodes(Node parent, String xpath) {
        return parent.selectNodes(xpath);
    }

    @Override
    protected Node querySingleNode(Node parent, String xpath) {
        return parent.selectSingleNode(xpath);
    }

    @Override
    protected Node parseXml(String messageXml) throws ASIParsingException {
        Node doc = null;
        InputStream is = new ByteArrayInputStream(messageXml.getBytes(StandardCharsets.UTF_8));
        try {
            SAXReader saxReader = new SAXReader(this.validateXml);
            saxReader.setEntityResolver(RESOLVER);
            doc = saxReader.read(is);
            doc.getDocument().normalize();
        } catch (DocumentException de) {
            throw new ASIParsingException("Not a Stanford resistance analysis XML file", de);
        }
        return doc;
    }

    @Override
    protected String getNodeText(Node node) {
        return node.getStringValue();
    }

}
