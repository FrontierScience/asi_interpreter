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

package org.fstrf.stanfordAsiInterpreter.resistance.xml;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.fstrf.stanfordAsiInterpreter.resistance.ASIParsingException;
import org.fstrf.stanfordAsiInterpreter.resistance.definition.CommentAction;
import org.fstrf.stanfordAsiInterpreter.resistance.definition.CommentDefinition;
import org.fstrf.stanfordAsiInterpreter.resistance.definition.Definition;
import org.fstrf.stanfordAsiInterpreter.resistance.definition.Drug;
import org.fstrf.stanfordAsiInterpreter.resistance.definition.DrugClass;
import org.fstrf.stanfordAsiInterpreter.resistance.definition.DrugLevelCondition;
import org.fstrf.stanfordAsiInterpreter.resistance.definition.Gene;
import org.fstrf.stanfordAsiInterpreter.resistance.definition.IndelRangeDefinition;
import org.fstrf.stanfordAsiInterpreter.resistance.definition.LevelAction;
import org.fstrf.stanfordAsiInterpreter.resistance.definition.LevelDefinition;
import org.fstrf.stanfordAsiInterpreter.resistance.definition.MutationType;
import org.fstrf.stanfordAsiInterpreter.resistance.definition.RangeValue;
import org.fstrf.stanfordAsiInterpreter.resistance.definition.ResultCommentRule;
import org.fstrf.stanfordAsiInterpreter.resistance.definition.Rule;
import org.fstrf.stanfordAsiInterpreter.resistance.definition.RuleAction;
import org.fstrf.stanfordAsiInterpreter.resistance.definition.RuleCondition;
import org.fstrf.stanfordAsiInterpreter.resistance.definition.ScoreRangeAction;

import com.google.common.collect.Sets;

import edu.stanford.hivdb.asijs.DOMParser;
import edu.stanford.hivdb.asijs.XPathEvaluator;
import edu.stanford.hivdb.asijs.jre.java.util.regex.Matcher;
import edu.stanford.hivdb.asijs.jre.java.util.regex.Pattern;
import elemental2.dom.Document;
import elemental2.dom.Node;
import elemental2.dom.XPathResult;

public class XmlAsiTransformer {

    private static final Pattern SCORE_RANGE_PATTERN = Pattern.compile("(-INF|\\d+(?:\\.\\d+)?)\\s*TO\\s*(INF|\\d+(?:\\.\\d+)?)\\s*=>\\s*(\\d+)");
    private static final Pattern SINGLE_SCORE_PATTERN = Pattern.compile("(\\(|\\,\\s*\\d+(?:\\.\\d+)?)\\s*=>\\s*(\\d+)");

    private static final XPathEvaluator XPATH_EVALUATOR = new XPathEvaluator();

    private static final String GENE_DEFINITION_XPATH = "/ALGORITHM/DEFINITIONS/GENE_DEFINITION";
    private static final String GENE_DEFINITION_NAME_XPATH = "NAME";
    private static final String GENE_DEFINITION_INDELRANGE_XPATH = "INDEL_RANGE_DEFINITION";
    private static final String GENE_DEFINITION_INDELRANGE_INPUT_XPATH = "INPUT";
    private static final String GENE_DEFINITION_INDELRANGE_OUTPUT_XPATH = "OUTPUT";
    private static final String GENE_DEFINITION_DRUGCLASSLIST_XPATH = "DRUGCLASSLIST";
    private static final String GENE_MUTATION_COMMENTS_XPATH = "/ALGORITHM/MUTATION_COMMENTS/GENE";
    private static final String GENE_MUTATION_COMMENTS__NAME_XPATH = "NAME";
    private static final String GENE_RULE_XPATH = "RULE";

    private static final String RESULT_COMMENT_XPATH = "/ALGORITHM/RESULT_COMMENTS/RESULT_COMMENT_RULE";
    private static final String RESULT_COMMENT_DRUG_LEVEL_CONDITIONS = "DRUG_LEVEL_CONDITIONS";
    private static final String RESULT_COMMENT_DRUG_LEVEL_CONDITION = "DRUG_LEVEL_CONDITION";
    private static final String RESULT_COMMENT_DRUG_NAME = "DRUG_NAME";
    private static final String RESULT_COMMENT_LEVEL_ACTION = "LEVEL_ACTION";
    private static final String RESULT_COMMENT_LEVEL_ACTION_COMMENT_XPATH = "COMMENT/@ref";

    private static final String LTE = "LTE";
    private static final String GTE = "GTE";
    private static final String LT = "LT";
    private static final String GT = "GT";
    private static final String EQ = "EQ";
    private static final String NEQ = "NEQ";

    private static final String LEVEL_XPATH = "/ALGORITHM/DEFINITIONS/LEVEL_DEFINITION";
    private static final String LEVEL_ORDER_XPATH = "ORDER";
    private static final String LEVEL_TEXT_XPATH = "ORIGINAL";
    private static final String LEVEL_SIR_XPATH = "SIR";

    private static final String COMMENT_XPATH = "/ALGORITHM/DEFINITIONS/COMMENT_DEFINITIONS/COMMENT_STRING";
    private static final String COMMENT_ID_XPATH = "@id";
    private static final String COMMENT_TEXT_XPATH = "TEXT";
    private static final String COMMENT_SORT_XPATH = "SORT_TAG";

    private static final String GLOBALRANGE_XPATH = "/ALGORITHM/DEFINITIONS/GLOBALRANGE";

    private static final String DRUG_XPATH = "ALGORITHM/DRUG";
    private static final String DRUG_NAME_XPATH = "NAME";
    private static final String DRUG_FULLNAME_XPATH = "FULLNAME";
    private static final String DRUG_MUTATION_TYPE_XPATH = "MUTATION_TYPE";
    private static final String DRUG_TYPE_NAME_XPATH = "TYPE_NAME";
    private static final String DRUG_MUTATION_LIST_XPATH = "MUTATIONS";

    private static final String ALGORITHM_NAME_XPATH = "ALGORITHM/ALGNAME";
    private static final String ALGORITHM_VERSION_XPATH = "ALGORITHM/ALGVERSION";
    private static final String ALGORITHM_DATE_XPATH = "ALGORITHM/ALGDATE";

    private static final String RULE_XPATH = "RULE";
    private static final String RULE_CONDITION_XPATH = "CONDITION";
    private static final String RULE_COMMENT_XPATH = "ACTIONS/COMMENT/@ref";
    private static final String RULE_LEVEL_XPATH = "ACTIONS/LEVEL";
    private static final String RULE_DEFAULT_LEVEL_XPATH = "ACTIONS/DEFAULT_LEVEL";
    private static final String RULE_SCORERANGE_XPATH = "ACTIONS/SCORERANGE";
    private static final String RULE_USE_GLOBALRANGE_XPATH = "USE_GLOBALRANGE";

    private static final String DRUG_CLASS_XPATH = "/ALGORITHM/DEFINITIONS/DRUGCLASS";
    private static final String DRUG_CLASS_NAME_XPATH = "NAME";
    private static final String DRUG_CLASS_DRUGLIST_XPATH = "DRUGLIST";

    public XmlAsiTransformer() {
    }

    private Document parseXml(String messageXml) throws ASIParsingException {
        Document doc = new DOMParser().parseFromString(messageXml, "application/xml");
        Node errorNode = doc.querySelector("parsererror");
        if (errorNode != null) {
            throw new ASIParsingException(errorNode.textContent);
        }
        doc.normalize();
        return doc;
    }
    /**
     * Parses algorithm XML file passed in as the is argument into component genes,
     * drug classes, drugs, rules, conditions, etc.
     *
     * Returns a map of gene names to Gene objects holding specified algorithm logic
     *
     * @param messageXml is a String of the algorithm XML file
     */
    public Map<String, Gene> transform(String messageXml) throws ASIParsingException {
        Document doc = parseXml(messageXml);

        Map<String, LevelDefinition> levels = createLevelMap(doc);
        Map<String, CommentDefinition> comments = createCommentMap(doc);

        Node globalNode = queryUniqueSingleNode(doc, GLOBALRANGE_XPATH);
        List<RangeValue> globalRange = (globalNode != null)
            ? parseScoreRange(queryUniqueSingleNode(doc, GLOBALRANGE_XPATH).textContent, levels)
            : new ArrayList<>();
        Map<String, Drug> drugs = parseDrugs(doc, levels, comments, globalRange);
        Map<String, DrugClass> drugClasses = parseDrugClasses(doc, drugs);

        Map<String, Gene> geneEvaluatedDrugs = parseGenes(doc, drugClasses);
        Set<String> geneNamesDrugs = geneEvaluatedDrugs.keySet();

        Map<String, Gene> geneEvaluatedMutationComments = parseGeneMutationComments(doc, levels, comments, globalRange);
        Set<String> geneNamesComments = geneEvaluatedMutationComments.keySet();

        List<ResultCommentRule> resultCommentRules = parseResultCommentRules(doc, levels, comments, drugs);

        Set<String> intersection = Sets.intersection(geneNamesDrugs, geneNamesComments);
        if (intersection.size() < geneNamesComments.size()) {
            throw new ASIParsingException("Some genes defined in MUTATION_COMMENTS, have no corresponding GENE_DEFINITION.");
        }

        Set<String> geneNames = new HashSet<>();
        geneNames.addAll(geneNamesDrugs);
        geneNames.addAll(geneNamesComments);

        Map<String, Gene> genes = new HashMap<>();
        /*
         * TODO needs to be revised
         *
         */
        for (String geneName : geneNames) {
            /*
             * for every gene
             */
            Gene geneDrugClass = geneEvaluatedDrugs.get(geneName);
            Gene geneMutationComments = geneEvaluatedMutationComments.get(geneName);

            if (geneMutationComments == null) {
                genes.put(geneName, new Gene(geneName, geneDrugClass.getDrugClasses(), new ArrayList<>(), resultCommentRules,
                    geneDrugClass.getIndelRangeDefinition(), geneDrugClass.getDefaultLevel()));
            } else {
                genes.put(geneName, new Gene(geneName, geneDrugClass.getDrugClasses(), geneMutationComments.getRules(), resultCommentRules,
                    geneDrugClass.getIndelRangeDefinition(), geneDrugClass.getDefaultLevel()));
            }
        }

        return genes;
    }

    private List<Node> queryNodes(Node parent, String xpath) {
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

    private Node querySingleNode(Node parent, String xpath) {
        List<Node> nodes = queryNodes(parent, xpath);
        return nodes.size() == 0 ? null : nodes.get(0);
    }

    private Node queryUniqueSingleNode(Node parent, String xpath) throws ASIParsingException {
        List<Node> nodes = queryNodes(parent, xpath);
        if (nodes.size() > 1) {
            throw new ASIParsingException("multiple nodes " + xpath + " exist within parent: " + parent.textContent);
        }
        return (nodes.size() == 0) ? null : nodes.get(0);
    }

    private Map<String, LevelDefinition> createLevelMap(Node root) {
        Map<String, LevelDefinition> levels = new HashMap<>();

        for (Node node : queryNodes(root, LEVEL_XPATH)) {
            String order = querySingleNode(node, LEVEL_ORDER_XPATH).textContent.trim();
            LevelDefinition level = new LevelDefinition(
                Integer.valueOf(order),
                querySingleNode(node, LEVEL_TEXT_XPATH).textContent.trim(),
                querySingleNode(node, LEVEL_SIR_XPATH).textContent.trim());
            levels.put(order, level);
        }
        return levels;
    }

    private Map<String, CommentDefinition> createCommentMap(Node root) {
        Map<String, CommentDefinition> comments = new HashMap<>();

        for (Node node : queryNodes(root, COMMENT_XPATH)) {
            String id = querySingleNode(node, COMMENT_ID_XPATH).textContent;
            String text = querySingleNode(node, COMMENT_TEXT_XPATH).textContent.trim();
            Node sort = querySingleNode(node, COMMENT_SORT_XPATH);
            CommentDefinition comment;
            if (sort == null) {
                comment = new CommentDefinition(id, text);
            } else {
                comment = new CommentDefinition(id, text, Integer.valueOf(sort.textContent));
            }

            comments.put(id, comment);
        }
        return comments;
    }

    /**
     * Returns a List of RangeValue objects representing the score ranges and levels
     * specified in the scoreRange argument.
     *
     * Levels are validated against keys of the levels argument.
     *
     * @param scoreRange	String specifying min score, max score, and level
     * @param levels		Map of acceptable levels as defined in algorithm XML
     * @return A list of RangeValue objects
     * @throws ASIParsingException
     */
    public List<RangeValue> parseScoreRange(String scoreRange, Map<String, LevelDefinition> levels) throws ASIParsingException {
        List<RangeValue> rangeValues = new ArrayList<>();
        Matcher matcher = SCORE_RANGE_PATTERN.matcher(scoreRange);
        while (matcher.find()) {
            double min = (matcher.group(1).trim().equals("-INF")) ? Double.NEGATIVE_INFINITY : Double.parseDouble(matcher.group(1).trim());
            double max = (matcher.group(2).trim().equals("INF")) ? Double.POSITIVE_INFINITY : Double.parseDouble(matcher.group(2).trim());
            String level = matcher.group(3).trim();
            if (levels.get(level) == null) {
                throw new ASIParsingException("undefined level: " + level);
            }
            RangeValue rangeValue = new RangeValue(min, max, levels.get(level));
            rangeValues.add(rangeValue);
        }
        //find the single scores, ie '100 => 12'
        matcher = SINGLE_SCORE_PATTERN.matcher(scoreRange);
        while (matcher.find()) {
            double val = Double.parseDouble(matcher.group(1).substring(1).trim());
            String level = matcher.group(2).trim();
            if (levels.get(level) == null) {
                throw new ASIParsingException("undefined level: " + level);
            }
            RangeValue rangeValue = new RangeValue(val, val, levels.get(level));
            rangeValues.add(rangeValue);
        }
        return rangeValues;
    }

    /**
     * Gathers all drugs in the given algorithm file.
     *
     */
    private Map<String, Drug> parseDrugs(Node root, Map<String, LevelDefinition> levels, Map<String, CommentDefinition> comments, List<RangeValue> globalRange)
        throws ASIParsingException {
        // traverse through the list of Drugs and add them to the list
        Map<String, Drug> drugs = new HashMap<>();

        List<Node> drugNodes = queryNodes(root, DRUG_XPATH);
        for (Node drug : drugNodes) {
            String drugName = querySingleNode(drug, DRUG_NAME_XPATH).textContent.trim();
            String drugFullName = null;
            int defaultLevel = 0;
            try {
                Node defaultLevelNode = querySingleNode(drug, RULE_DEFAULT_LEVEL_XPATH);
                if (defaultLevelNode != null) {
                    defaultLevel = Integer.parseInt(defaultLevelNode.textContent);
                }
            } catch (NullPointerException e) {
                //TODO: don't allow missing DEFAUL_LEVEL tag
            }
            Node fullNameNode = querySingleNode(drug, DRUG_FULLNAME_XPATH);
            if (fullNameNode != null) {
                drugFullName = fullNameNode.textContent.trim();
            }
            List<MutationType> drugMutationTypes = new ArrayList<MutationType>();
            List<Node> nodes = queryNodes(drug, DRUG_MUTATION_TYPE_XPATH);
            for (Node node : nodes) {
                String typeName = querySingleNode(node, DRUG_TYPE_NAME_XPATH).textContent.trim();
                String drugListStr = querySingleNode(node, DRUG_MUTATION_LIST_XPATH).textContent.trim();
                String[] drugNames = drugListStr.split(",");
                drugMutationTypes.add(new MutationType(typeName, Arrays.asList(drugNames)));
            }

            // get all rules for one drug
            List<Node> ruleNodes = queryNodes(drug, RULE_XPATH);
            List<Rule> drugRules = parseRules(ruleNodes, levels, comments, globalRange);
            drugs.put(drugName, new Drug(drugName, drugFullName, drugRules, drugMutationTypes, defaultLevel));
        }
        return drugs;
    }

    private List<Rule> parseRules(List<Node> ruleNodes, Map<String, LevelDefinition> levels, Map<String, CommentDefinition> comments,
        List<RangeValue> globalRange) throws ASIParsingException {

        List<Rule> drugRules = new ArrayList<>();
        for (Node rule : ruleNodes) {
            RuleCondition condition = new RuleCondition(querySingleNode(rule, RULE_CONDITION_XPATH).textContent.trim());

            List<RuleAction<?, ?>> ruleActions = new ArrayList<>();
            // attempt to retrieve all of the possible action nodes (e.g.: comment, score range, level)
            Node commentNode = queryUniqueSingleNode(rule, RULE_COMMENT_XPATH);
            Node levelNode = queryUniqueSingleNode(rule, RULE_LEVEL_XPATH);
            Node scoreRangeNode = queryUniqueSingleNode(rule, RULE_SCORERANGE_XPATH);

            if (commentNode != null) {
                CommentDefinition definition = getRequiredDefinition(comments, commentNode);
                ruleActions.add(new CommentAction(definition));
            }
            if (levelNode != null) {
                LevelDefinition definition = getRequiredDefinition(levels, levelNode);
                ruleActions.add(new LevelAction(definition));
            }
            if (scoreRangeNode != null) {
                // If a global range reference exists map to the global range else parse out a new range
                List<RangeValue> scoreRange;
                if (queryNodes(scoreRangeNode, RULE_USE_GLOBALRANGE_XPATH).size() == 1) {
                    if (globalRange.size() == 0) {
                        throw new ASIParsingException("required global range does not exist: " + scoreRangeNode.textContent);
                    }
                    scoreRange = globalRange;
                } else {
                    scoreRange = parseScoreRange(scoreRangeNode.textContent.trim(), levels);
                }
                ruleActions.add(new ScoreRangeAction(scoreRange));
            }
            if (commentNode == null && levelNode == null && scoreRangeNode == null) {
                throw new ASIParsingException("no action exists for rule: " + rule.textContent + "/ \n" + condition.getStatement());
            }

            drugRules.add(new Rule(condition, ruleActions));
        }

        return drugRules;
    }

    private Map<String, DrugClass> parseDrugClasses(Node root, Map<String, Drug> drugs) throws ASIParsingException {
        Set<String> tagDefinedDrugNames = new HashSet<>();
        tagDefinedDrugNames.addAll(drugs.keySet());

        Map<String, DrugClass> drugClasses = new HashMap<>();
        List<Node> nodes = queryNodes(root, DRUG_CLASS_XPATH);
        /*
         * for every drug class node create a DrugClass object
         */
        for (Node drugClassNode : nodes) {
            String className = queryUniqueSingleNode(drugClassNode, DRUG_CLASS_NAME_XPATH).textContent.trim();
            String drugListStr = queryUniqueSingleNode(drugClassNode, DRUG_CLASS_DRUGLIST_XPATH).textContent.trim();
            String[] drugNames = drugListStr.split(",");

            Set<Drug> drugList = new HashSet<>();
            for (String drugName : drugNames) {
                drugName = drugName.trim();
                Drug drug = drugs.get(drugName);
                if (drug == null) {
                    throw new ASIParsingException(drugName + " has not been defined as a drug.");
                }
                if (!isUniqueDefinedDrug(drug.getDrugName(), drugClasses)) {
                    throw new ASIParsingException("The drug: " + drug.getDrugName() + "; has been defined for more than one drug class.");
                }

                /*
                 * remove the valid drug from the drug list defined in DRUG tags
                 */
                tagDefinedDrugNames.remove(drug.getDrugName());
                drugList.add(drug);
            }
            drugClasses.put(className, new DrugClass(className, drugList));
        }

        /*
         * some drugs defined in DRUG tags are not associated with any class
         */

        if (tagDefinedDrugNames.size() > 0) {
            throw new ASIParsingException("The following drugs have not been associated with a drug class: " + tagDefinedDrugNames.toString());
        }

        return drugClasses;
    }

    private Map<String, Gene> parseGenes(Node root, Map<String, DrugClass> drugClasses) throws ASIParsingException {
        List<Node> nodes = queryNodes(root, GENE_DEFINITION_XPATH);
        if (nodes.size() == 0) {
            throw new ASIParsingException("no gene specified");
        }

        Map<String, Gene> genes = new HashMap<>();
        /*
         * create a map of genes
         * every gene has associated a list of DrugClass objects
         */
        for (Node node : nodes) {
            String geneName = querySingleNode(node, GENE_DEFINITION_NAME_XPATH).textContent.trim();
            /*
             * get the names of drug classes
             */
            List<Node> drugClassListNodes = queryNodes(node, GENE_DEFINITION_DRUGCLASSLIST_XPATH);
            if (drugClassListNodes.size() > 1) {
                throw new ASIParsingException("duplicate node " + GENE_DEFINITION_DRUGCLASSLIST_XPATH);
            }

            IndelRangeDefinition indelRange = null;
            Node indelRangeNode = querySingleNode(node, GENE_DEFINITION_INDELRANGE_XPATH);
            if (indelRangeNode != null) {
                String inputListStr = queryUniqueSingleNode(indelRangeNode, GENE_DEFINITION_INDELRANGE_INPUT_XPATH).textContent.trim();
                String[] indelInputs = inputListStr.split(" ");
                String indelOutput = queryUniqueSingleNode(indelRangeNode, GENE_DEFINITION_INDELRANGE_OUTPUT_XPATH).textContent.trim();
                indelRange = new IndelRangeDefinition(Arrays.asList(indelInputs), indelOutput);
            }

            Set<DrugClass> drugClassSet = new HashSet<>();
            if (drugClassListNodes.size() == 1) {
                String drugClassListStr = drugClassListNodes.get(0).textContent.trim();
                if (drugClassListStr.trim().equals("")) {
                    throw new ASIParsingException("drug class list missing for gene " + geneName);
                }
                String[] drugClassNames = drugClassListStr.split(",");
                /*
                 * create the DrugClass list
                 */
                for (String drugClassName : drugClassNames) {
                    drugClassSet.add(drugClasses.get(drugClassName.trim()));
                }

            }
            genes.put(geneName, new Gene(geneName, drugClassSet, indelRange));
        }
        return genes;
    }

    private Map<String, Gene> parseGeneMutationComments(Node root, Map<String, LevelDefinition> levels, Map<String, CommentDefinition> comments,
        List<RangeValue> globalRange) throws ASIParsingException {
        /*
         * get all the gene nodes specified in GENE_MUTATION_COMMENTS
         */
        List<Node> nodes = queryNodes(root, GENE_MUTATION_COMMENTS_XPATH);
        Map<String, Gene> genes = new HashMap<>();
        /*
         * for every gene node
         */
        for (Node geneNode : nodes) {
            Node geneNameNode = queryUniqueSingleNode(geneNode, GENE_MUTATION_COMMENTS__NAME_XPATH);
            /*
             * if no gene name throw an ASIParsingException
             */
            if (geneNameNode == null) {
                throw new ASIParsingException("no gene name");
            }

            /*
             * get the gene rules
             */
            List<Node> geneRuleNodes = queryNodes(geneNode, GENE_RULE_XPATH);

            if (geneRuleNodes.size() == 0) {
                /*
                 * no rules for the current gene
                 */
                throw new ASIParsingException("no rule for gene " + geneNameNode.textContent);
            }

            String geneName = geneNameNode.textContent.trim();
            List<Rule> geneRules = parseRules(geneRuleNodes, levels, comments, globalRange);
            /*
             * for every gene rule
             */

            genes.put(geneName, new Gene(geneName, geneRules));
        }

        return genes;
    }

    private boolean isUniqueDefinedDrug(String drugName, Map<String, DrugClass> drugClasses) {
        /*
         * search for every class if the drug is already associated with a different one
         */
        for (DrugClass drugClass : drugClasses.values()) {
            Set<Drug> drugList = drugClass.getDrugs();
            /*
             * for every drug of the class
             */
            for (Drug drug : drugList) {
                if (drugName.equals(drug.getDrugName())) {
                    return false;
                }
            }
        }
        return true;
    }

    private <T extends Definition> T getRequiredDefinition(Map<String, T> definitions, Node key) throws ASIParsingException {
        T obj = definitions.get(key.textContent.trim());
        if (obj == null) {
            throw new ASIParsingException("required definition: " + key.textContent + " does not exist.");
        }
        return obj;
    }

    /**
     * Returns a map of metadata about algorithm XML file passed in as is argument.
     *
     * @param	messageXml is a String of the algorithm XML file
     * @return	Map of metadata about algorithm XML file
     */
    public Map<String, Map<String, ?>> getAlgorithmInfo(String messageXml) throws ASIParsingException {
        Document doc = parseXml(messageXml);

        Map<String, Map<String, ?>> map = new HashMap<>();

        Map<String, String> algNameVersionDate = parseForAlgNameVersionDate(doc);
        map.put("ALGNAME_ALGVERSION_ALGDATE", algNameVersionDate);
        map.put("ALGNAME_ALGVERSION", algNameVersionDate);

        // get the lowest levelDefinition as defined when the order = 1
        LevelDefinition lowestLevelDefinition = createLevelMap(doc).get("1");
        Map<String, String> lowestLevelOriginalSir = new HashMap<>();
        lowestLevelOriginalSir.put("ORIGINAL", lowestLevelDefinition.getText());
        lowestLevelOriginalSir.put("SIR", lowestLevelDefinition.getSir());
        map.put("ORDER1_ORIGINAL_SIR", lowestLevelOriginalSir);

        Map<String, String> drugAndFullNames = parseForDrugAndFullNames(doc);
        map.put("DRUG_FULLNAME", drugAndFullNames);

        Map<String, Set<String>> drugClassAndDrugs = parseForDrugClassesAndDrugs(doc, drugAndFullNames);
        map.put("DRUGCLASS_DRUGLIST", drugClassAndDrugs);

        Map<String, Set<String>> geneAndDrugClasses = parseForGeneAndDrugClasses(doc, drugClassAndDrugs);
        map.put("GENE_DRUGCLASSLIST", geneAndDrugClasses);

        return map;
    }

    /**
     * returns hash with algorithm name, version, and date
     * @param root
     * @return
     * @throws ASIParsingException
     */
    private Map<String, String> parseForAlgNameVersionDate(Node root) throws ASIParsingException {
        // traverse through the list of Drugs and add them to the list
        Map<String, String> algInfo = new HashMap<>();

        String algName = querySingleNode(root, ALGORITHM_NAME_XPATH).textContent.trim();
        String algVersion = querySingleNode(root, ALGORITHM_VERSION_XPATH).textContent.trim();

        // must check because algorithm version was added later on
        String algDate = "NA";
        Node dateNode = querySingleNode(root, ALGORITHM_DATE_XPATH);
        if (dateNode != null)
            algDate = dateNode.textContent.trim();

        algInfo.put("ALGNAME", algName);
        algInfo.put("ALGVERSION", algVersion);
        algInfo.put("ALGDATE", algDate);

        return algInfo;
    }

    // derived from parseDrugs() above; except that for efficiency we don't want the rules
    // returns: a HashMap<String, String> drugName => drugFullName
    private Map<String, String> parseForDrugAndFullNames(Node root) throws ASIParsingException {
        // traverse through the list of Drugs and add them to the list
        Map<String, String> drugs = new HashMap<>();

        List<Node> drugNodes = queryNodes(root, DRUG_XPATH);
        for (Node drug : drugNodes) {
            String drugName = querySingleNode(drug, DRUG_NAME_XPATH).textContent.trim();
            String drugFullName = null;
            Node fullNameNode = querySingleNode(drug, DRUG_FULLNAME_XPATH);
            if (fullNameNode != null) {
                drugFullName = fullNameNode.textContent.trim();
            }

            drugs.put(drugName, drugFullName);
        }
        return drugs;
    }

    // derived from parseDrugClasses() above; except that for efficiency we don't want the rules and thus no Drug objects
    private Map<String, Set<String>> parseForDrugClassesAndDrugs(Node root, Map<String, String> drugs) throws ASIParsingException {
        Set<String> tagDefinedDrugNames = new HashSet<>();
        tagDefinedDrugNames.addAll(drugs.keySet());

        Map<String, Set<String>> drugClasses = new HashMap<>();
        List<Node> nodes = queryNodes(root, DRUG_CLASS_XPATH);
        /*
         * for every drug class node create a DrugClass object
         */
        for (Node drugClassNode : nodes) {
            String className = queryUniqueSingleNode(drugClassNode, DRUG_CLASS_NAME_XPATH).textContent.trim();
            String drugListStr = queryUniqueSingleNode(drugClassNode, DRUG_CLASS_DRUGLIST_XPATH).textContent.trim();
            String[] drugNames = drugListStr.split(",");

            Set<String> drugList = new HashSet<>();
            for (String drugName : drugNames) {
                drugName = drugName.trim();
                if (!drugs.containsKey(drugName)) {
                    throw new ASIParsingException(drugName + " has not been defined as a drug.");
                }
                if (!isUniqueDefinedDrug2(drugName, drugClasses)) {
                    throw new ASIParsingException("The drug: " + drugName + "; has been defined for more than one drug class.");
                }

                /*
                 * remove the valid drug from the drug list defined in DRUG tags
                 */
                tagDefinedDrugNames.remove(drugName);
                drugList.add(drugName);
            }
            drugClasses.put(className, drugList);
        }

        /*
         * some drugs defined in DRUG tags are not associated with any class
         */

        if (tagDefinedDrugNames.size() > 0) {
            throw new ASIParsingException("The following drugs have not been associated with a drug class: " + tagDefinedDrugNames.toString());
        }

        return drugClasses;
    }

    // derived from isUniqueDefinedDrug() above; except that for efficiency we don't want the rules	and thus no Drug objects
    private boolean isUniqueDefinedDrug2(String inDrugName, Map<String, Set<String>> drugClasses) {
        /*
         * search for every class if the drug is already associated with a different one
         */
        for (String className : drugClasses.keySet()) {
            Set<String> drugList = drugClasses.get(className);
            /*
             * for every drug of the class
             */
            if (drugList.contains(inDrugName))
                return false;
        }
        return true;
    }

    // derived from parseGenes() above; except that for efficiency we don't want the rules and thus no Drug objects
    private Map<String, Set<String>> parseForGeneAndDrugClasses(Node root, Map<String, Set<String>> drugClasses) throws ASIParsingException {
        List<Node> nodes = queryNodes(root, GENE_DEFINITION_XPATH);
        if (nodes.size() == 0) {
            throw new ASIParsingException("no gene specified");
        }

        Map<String, Set<String>> genes = new HashMap<>();
        /*
         * create a map of genes
         * every gene has associated a list of DrugClass objects
         */
        for (Node node : nodes) {
            String geneName = querySingleNode(node, GENE_DEFINITION_NAME_XPATH).textContent.trim();
            /*
             * get the names of drug classes
             */
            List<Node> drugClassListNodes = queryNodes(node, GENE_DEFINITION_DRUGCLASSLIST_XPATH);
            if (drugClassListNodes.size() > 1) {
                throw new ASIParsingException("duplicate node " + GENE_DEFINITION_DRUGCLASSLIST_XPATH);
            }

            Set<String> drugClassSet = new HashSet<>();
            if (drugClassListNodes.size() == 1) {
                String drugClassListStr = (drugClassListNodes.get(0)).textContent.trim();
                if (drugClassListStr.trim().equals("")) {
                    throw new ASIParsingException("drug class list missing for gene " + geneName);
                }
                String[] drugClassNames = drugClassListStr.split(",");
                /*
                 * create the DrugClass list
                 */
                for (String drugClassName : drugClassNames) {
                    drugClassName = drugClassName.trim();
                    if (drugClasses.containsKey(drugClassName))
                        drugClassSet.add(drugClassName);
                    else
                        throw new ASIParsingException(drugClassName + " has not been defined as a drugClass.");

                }

            }
            genes.put(geneName, drugClassSet);
        }
        return genes;
    }

    private List<ResultCommentRule> parseResultCommentRules(Node root, Map<String, LevelDefinition> levels, Map<String, CommentDefinition> comments,
        Map<String, Drug> definedDrugs) throws ASIParsingException {

        //Get all the result comment nodes
        List<Node> nodes = queryNodes(root, RESULT_COMMENT_XPATH);

        List<ResultCommentRule> resultCommentRules = new ArrayList<ResultCommentRule>();

        for (Node ruleNode : nodes) {

            Node levelConditionNode = queryUniqueSingleNode(ruleNode, RESULT_COMMENT_DRUG_LEVEL_CONDITIONS);

            // Get the drug level condition nodes
            List<Node> drugLevelConditionNodes = queryNodes(levelConditionNode, RESULT_COMMENT_DRUG_LEVEL_CONDITION);

            //if no conditions, throw an ASIParsingException
            if (drugLevelConditionNodes.size() == 0) {
                throw new ASIParsingException("no drug level conditions specified in result comment rule");
            }

            //add all conditions to a list
            List<DrugLevelCondition> drugLevelConditions = new ArrayList<DrugLevelCondition>();
            for (Node drugLevelConditionNode : drugLevelConditionNodes) {
                drugLevelConditions.add(parseDrugLevelCondition(drugLevelConditionNode, levels, definedDrugs));
            }

            Node levelActionNode = queryUniqueSingleNode(ruleNode, RESULT_COMMENT_LEVEL_ACTION);
            //if no level action, throw an ASIParsingException
            if (levelActionNode == null) {
                throw new ASIParsingException("no level action specified for result comment");
            }
            List<CommentAction> levelActions = parseLevelActions(levelActionNode, comments);

            resultCommentRules.add(new ResultCommentRule(drugLevelConditions, levelActions));
        }

        return resultCommentRules;

    }

    private DrugLevelCondition parseDrugLevelCondition(Node levelConditionNode, Map<String, LevelDefinition> levels, Map<String, Drug> drugs)
        throws ASIParsingException {
        //search drugLevelConditionNode for each of the comparison operators
        //	Treat this like actions where there can be multiple, and throw exception if there are none

        String drugName = queryUniqueSingleNode(levelConditionNode, RESULT_COMMENT_DRUG_NAME).textContent;

        //verify that the drug is specified in the algorithm
        if (!drugs.containsKey(drugName)) {
            throw new ASIParsingException(drugName + " has result comment rules but is not defined as a drug");
        }

        DrugLevelCondition drugLevelCondition = new DrugLevelCondition(drugName);

        //find elements and call addComparison if they exist

        Node LTENode = queryUniqueSingleNode(levelConditionNode, LTE);
        Node GTENode = queryUniqueSingleNode(levelConditionNode, GTE);
        Node LTNode = queryUniqueSingleNode(levelConditionNode, LT);
        Node GTNode = queryUniqueSingleNode(levelConditionNode, GT);
        Node EQNode = queryUniqueSingleNode(levelConditionNode, EQ);
        Node NEQNode = queryUniqueSingleNode(levelConditionNode, NEQ);

        boolean anyNodeSpecified = false;

        if (LTENode != null) {
            String levelString = LTENode.textContent;
            Integer level = getValidatedLevelFromString(levelString, levels);
            drugLevelCondition.addComparison(level, "LTE");
            anyNodeSpecified = true;
        }
        if (GTENode != null) {
            String levelString = GTENode.textContent;
            Integer level = getValidatedLevelFromString(levelString, levels);
            drugLevelCondition.addComparison(level, "GTE");
            anyNodeSpecified = true;
        }
        if (LTNode != null) {
            String levelString = LTNode.textContent;
            Integer level = getValidatedLevelFromString(levelString, levels);
            drugLevelCondition.addComparison(level, "LT");
            anyNodeSpecified = true;
        }
        if (GTNode != null) {
            String levelString = GTNode.textContent;
            Integer level = getValidatedLevelFromString(levelString, levels);
            drugLevelCondition.addComparison(level, "GT");
            anyNodeSpecified = true;
        }
        if (EQNode != null) {
            String levelString = EQNode.textContent;
            Integer level = getValidatedLevelFromString(levelString, levels);
            drugLevelCondition.addComparison(level, "EQ");
            anyNodeSpecified = true;
        }
        if (NEQNode != null) {
            String levelString = NEQNode.textContent;
            Integer level = getValidatedLevelFromString(levelString, levels);
            drugLevelCondition.addComparison(level, "NEQ");
            anyNodeSpecified = true;
        }

        if (!anyNodeSpecified) {
            throw new ASIParsingException("no level comparison specified in level condition");
        }

        return drugLevelCondition;
    }

    private Integer getValidatedLevelFromString(String levelString, Map<String, LevelDefinition> levels) throws ASIParsingException {
        Integer level;

        //validate as integer
        try {
            level = Integer.parseInt(levelString);
        } catch (NumberFormatException e) {
            throw new ASIParsingException("specified level order \"" + levelString + "\" is not an integer");
        }

        //validate against defined levels - level map uses string keys, so use the levelString
        if (!levels.containsKey(levelString)) {
            throw new ASIParsingException(levelString + " has not been defined as a level order");
        }

        return level;
    }

    private List<CommentAction> parseLevelActions(Node levelActionNode, Map<String, CommentDefinition> comments) throws ASIParsingException {

        List<CommentAction> actions = new ArrayList<>();

        //get comment node from LEVEL_ACTION
        Node commentNode = queryUniqueSingleNode(levelActionNode, RESULT_COMMENT_LEVEL_ACTION_COMMENT_XPATH);
        //if no comment, throw parsing exception
        if (commentNode == null) {
            throw new ASIParsingException("no comment specified for level action");
        }

        CommentDefinition definition = getRequiredDefinition(comments, commentNode);
        actions.add(new CommentAction(definition));

        return actions;
    }

}
