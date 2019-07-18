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

import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.collections.CollectionUtils;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Node;
import org.dom4j.XPath;
import org.dom4j.io.SAXReader;
import org.dom4j.xpath.DefaultXPath;
import org.fstrf.stanfordAsiInterpreter.resistance.ASIParsingException;
import org.fstrf.stanfordAsiInterpreter.resistance.AsiTransformer;
import org.fstrf.stanfordAsiInterpreter.resistance.definition.CommentAction;
import org.fstrf.stanfordAsiInterpreter.resistance.definition.CommentDefinition;
import org.fstrf.stanfordAsiInterpreter.resistance.definition.Definition;
import org.fstrf.stanfordAsiInterpreter.resistance.definition.Drug;
import org.fstrf.stanfordAsiInterpreter.resistance.definition.DrugClass;
import org.fstrf.stanfordAsiInterpreter.resistance.definition.Gene;
import org.fstrf.stanfordAsiInterpreter.resistance.definition.LevelAction;
import org.fstrf.stanfordAsiInterpreter.resistance.definition.LevelCondition;
import org.fstrf.stanfordAsiInterpreter.resistance.definition.LevelDefinition;
import org.fstrf.stanfordAsiInterpreter.resistance.definition.LevelRule;
import org.fstrf.stanfordAsiInterpreter.resistance.definition.RangeValue;
import org.fstrf.stanfordAsiInterpreter.resistance.definition.ResultCommentDrug;
import org.fstrf.stanfordAsiInterpreter.resistance.definition.Rule;
import org.fstrf.stanfordAsiInterpreter.resistance.definition.RuleCondition;
import org.fstrf.stanfordAsiInterpreter.resistance.definition.ScoreRangeAction;
import org.xml.sax.EntityResolver;
import org.xml.sax.InputSource;

public class XmlAsiTransformer implements AsiTransformer {

	private static final Pattern SCORE_RANGE_PATTERN = Pattern.compile("(-INF|\\d+(?:\\.\\d+)?)\\s*TO\\s*(INF|\\d+(?:\\.\\d+)?)\\s*=>\\s*(\\d+)");

	private static final XPath GENE_DEFINITION_XPATH = new DefaultXPath("/ALGORITHM/DEFINITIONS/GENE_DEFINITION");
	private static final XPath GENE_DEFINITION_NAME_XPATH = new DefaultXPath("NAME");
	private static final XPath GENE_DEFINITION_DRUGCLASSLIST_XPATH = new DefaultXPath("DRUGCLASSLIST");
	private static final XPath GENE_MUTATION_COMMENTS_XPATH = new DefaultXPath("/ALGORITHM/MUTATION_COMMENTS/GENE");
	private static final XPath GENE_MUTATION_COMMENTS__NAME_XPATH = new DefaultXPath("NAME");
	private static final XPath GENE_RULE_XPATH = new DefaultXPath("RULE");

	private static final XPath RESULT_COMMENTS_XPATH = new DefaultXPath("/ALGORITHM/RESULT_COMMENTS/RESULT_COMMENT_DRUG");
	private static final XPath RESULT_COMMENT_DRUG_NAME = new DefaultXPath("NAME");
	private static final XPath RESULT_COMMENT_LEVEL_RULE = new DefaultXPath("LEVEL_RULE");
	private static final XPath RESULT_COMMENT_LEVEL_CONDITION = new DefaultXPath("LEVEL_CONDITION");
	private static final XPath RESULT_COMMENT_LEVEL_ACTION = new DefaultXPath("LEVEL_ACTION");
	private static final XPath RESULT_COMMENT_LEVEL_ACTION_COMMENT_XPATH = new DefaultXPath("COMMENT/@ref");

	private static final XPath LTE = new DefaultXPath("LTE");
	private static final XPath GTE = new DefaultXPath("GTE");
	private static final XPath LT = new DefaultXPath("LT");
	private static final XPath GT = new DefaultXPath("GT");
	private static final XPath EQ = new DefaultXPath("EQ");
	private static final XPath NEQ = new DefaultXPath("NEQ");

	private static final XPath LEVEL_XPATH = new DefaultXPath("/ALGORITHM/DEFINITIONS/LEVEL_DEFINITION");
	private static final XPath LEVEL_ORDER_XPATH = new DefaultXPath("ORDER");
	private static final XPath LEVEL_TEXT_XPATH = new DefaultXPath("ORIGINAL");
	private static final XPath LEVEL_SIR_XPATH = new DefaultXPath("SIR");

	private static final XPath COMMENT_XPATH = new DefaultXPath("/ALGORITHM/DEFINITIONS/COMMENT_DEFINITIONS/COMMENT_STRING");
	private static final XPath COMMENT_ID_XPATH = new DefaultXPath("@id");
	private static final XPath COMMENT_TEXT_XPATH = new DefaultXPath("TEXT");
	private static final XPath COMMENT_SORT_XPATH = new DefaultXPath("SORT_TAG");

	private static final XPath GLOBALRANGE_XPATH = new DefaultXPath("/ALGORITHM/DEFINITIONS/GLOBALRANGE");

	private static final DefaultXPath DRUG_XPATH = new DefaultXPath("ALGORITHM/DRUG");
	private static final DefaultXPath DRUG_NAME_XPATH = new DefaultXPath("NAME");
	private static final DefaultXPath DRUG_FULLNAME_XPATH = new DefaultXPath("FULLNAME");

	private static final DefaultXPath ALGORITHM_NAME_XPATH = new DefaultXPath("ALGORITHM/ALGNAME");
	private static final DefaultXPath ALGORITHM_VERSION_XPATH = new DefaultXPath("ALGORITHM/ALGVERSION");
	private static final DefaultXPath ALGORITHM_DATE_XPATH = new DefaultXPath("ALGORITHM/ALGDATE");

	private static final DefaultXPath RULE_XPATH = new DefaultXPath("RULE");
	private static final DefaultXPath RULE_CONDITION_XPATH = new DefaultXPath("CONDITION");
	private static final DefaultXPath RULE_COMMENT_XPATH = new DefaultXPath("ACTIONS/COMMENT/@ref");
	private static final DefaultXPath RULE_LEVEL_XPATH = new DefaultXPath("ACTIONS/LEVEL");
	private static final DefaultXPath RULE_SCORERANGE_XPATH = new DefaultXPath("ACTIONS/SCORERANGE");
	private static final DefaultXPath RULE_USE_GLOBALRANGE_XPATH = new DefaultXPath("USE_GLOBALRANGE");

	private static final DefaultXPath DRUG_CLASS_XPATH = new DefaultXPath("/ALGORITHM/DEFINITIONS/DRUGCLASS");
	private static final DefaultXPath DRUG_CLASS_NAME_XPATH = new DefaultXPath("NAME");
	private static final DefaultXPath DRUG_CLASS_DRUGLIST_XPATH = new DefaultXPath("DRUGLIST");

	private static final EntityResolver RESOLVER = new EntityResolver() {
		@Override
		public InputSource resolveEntity(String publicId, String systemId) {
			if(systemId.endsWith("stanford.edu/asi/xml/ASI.dtd")) {
				InputStream in = getClass().getClassLoader().getResourceAsStream(
						"org/fstrf/stanfordAsiInterpreter/resistance/ASI.dtd");
				return new InputSource(in);
			}else if (systemId.endsWith("stanford.edu/sierra/ASI2.dtd")){
				InputStream in = getClass().getClassLoader().getResourceAsStream(
						"org/fstrf/stanfordAsiInterpreter/resistance/ASI2.dtd");
				return new InputSource(in);
			}else if (systemId.endsWith("stanford.edu/sierra/ASI2.1.dtd")){
                InputStream in = getClass().getClassLoader().getResourceAsStream(
                        "org/fstrf/stanfordAsiInterpreter/resistance/ASI2.1.dtd");
                return new InputSource(in);
            } else if (systemId.endsWith("stanford.edu/sierra/ASI2.2.dtd")){
            	InputStream in = getClass()
            			.getClassLoader()
            			.getResourceAsStream(
            			"org/fstrf/stanfordAsiInterpreter/resistance/ASI2.2.dtd");
            	return new InputSource(in);
            }
			return null;
		}
	};

	private boolean validateXml;

	public XmlAsiTransformer(boolean validateXml) {
		this.validateXml = validateXml;
	}

	/**
	 * Parses algorithm XML file passed in as the is argument into component genes,
	 * drug classes, drugs, rules, conditions, etc.
	 *
	 * Returns a map of gene names to Gene objects holding specified algorithm logic
	 *
	 * @param is an InputStream created from the algorithm XML file
	 */
	@Override
	public Map transform(InputStream is) throws ASIParsingException {
		Document doc = null;
        try {
            SAXReader saxReader = new SAXReader(this.validateXml);
            saxReader.setEntityResolver(RESOLVER);
            doc = saxReader.read(new InputStreamReader(is));
            doc.getDocument().normalize();
        } catch(DocumentException de) {
            throw new ASIParsingException("Not a Stanford resistance analysis XML file", de);
        }

        Map levels = createLevelMap(doc);
        Map comments = createCommentMap(doc);

        Node globalNode = selectUniqueSingleNode(doc, GLOBALRANGE_XPATH);
        List globalRange = (globalNode != null) ? parseScoreRange(selectUniqueSingleNode(doc, GLOBALRANGE_XPATH).getStringValue(), levels) : new ArrayList();
        Map drugs = parseDrugs(doc, levels, comments, globalRange);
        Map drugClasses = parseDrugClasses(doc, drugs);

        Map geneEvaluatedDrugs = parseGenes(doc, drugClasses);
        Set geneNamesDrugs = geneEvaluatedDrugs.keySet();

        Map geneEvaluatedMutationComments = parseGeneMutationComments(doc, levels, comments, globalRange);
        Set geneNamesComments = geneEvaluatedMutationComments.keySet();

        Map<String,ResultCommentDrug> resultComments = parseResultComments(doc,levels,comments,drugs);

        Collection intersection = CollectionUtils.intersection(geneNamesDrugs, geneNamesComments);
        if (intersection.size() < geneNamesComments.size()){
        	throw new ASIParsingException("Some genes defined in MUTATION_COMMENTS, have no corresponding GENE_DEFINITION.");
        }

        Set geneNames = new HashSet();
        geneNames.addAll(geneNamesDrugs);
        geneNames.addAll(geneNamesComments);

        Map genes = new HashMap();
        /*
         * TODO needs to be revised
         *
         */
        for (Iterator iterator = geneNames.iterator(); iterator.hasNext();) {
			/*
			 * for every gene
			 */
        	String geneName = (String) iterator.next();

        	Gene geneDrugClass = (Gene) geneEvaluatedDrugs.get(geneName);
        	Gene geneMutationComments = (Gene)geneEvaluatedMutationComments.get(geneName);
        	Map<String,ResultCommentDrug> geneResultCommentDrugs = new HashMap<String,ResultCommentDrug>();

        	//For each drug associated with the gene, add all result comment rules to geneDrugLevelRules
        	for (Object drugClassObj: geneDrugClass.getDrugClasses()){
        		DrugClass drugClass = (DrugClass) drugClassObj;
        		for (Object drugObj: drugClass.getDrugs()){
        			Drug drug = (Drug) drugObj;
        			String drugName = drug.getDrugName();
        			if (resultComments.containsKey(drugName)){
        				geneResultCommentDrugs.put(drugName,resultComments.get(drugName));
        			}
        		}
        	}

        	if (geneMutationComments == null){
        		genes.put(geneName, new Gene(geneName, geneDrugClass.getDrugClasses(), new ArrayList(),geneResultCommentDrugs));
        	}
        	else{
        		genes.put(geneName, new Gene(geneName, geneDrugClass.getDrugClasses(), geneMutationComments.getRules(),geneResultCommentDrugs));
        	}
		}

        return genes;
	}

	private Map createLevelMap(Node root) {
		List nodes = root.selectNodes(LEVEL_XPATH.getText());
		Map levels = new HashMap(2 * nodes.size());

		for(Iterator iterator = nodes.iterator(); iterator.hasNext();) {
			Node node = (Node) iterator.next();
			String order = node.selectSingleNode(LEVEL_ORDER_XPATH.getText()).getStringValue().trim();
			LevelDefinition level = new LevelDefinition(Integer.valueOf(order),
					node.selectSingleNode(LEVEL_TEXT_XPATH.getText()).getStringValue().trim(),
					node.selectSingleNode(LEVEL_SIR_XPATH.getText()).getStringValue().trim());
			levels.put(order, level);
		}
		return levels;
	}

	private Map createCommentMap(Node root) {
		List nodes = root.selectNodes(COMMENT_XPATH.getText());
		Map comments = new HashMap(2 * nodes.size());

		for(Iterator iterator = nodes.iterator(); iterator.hasNext();) {
			Node node = (Node) iterator.next();
			String id = node.selectSingleNode(COMMENT_ID_XPATH.getText()).getStringValue().trim();
			String text = node.selectSingleNode(COMMENT_TEXT_XPATH.getText()).getStringValue().trim();
			Node sort = node.selectSingleNode(COMMENT_SORT_XPATH.getText());
			CommentDefinition comment;
			if(sort == null) {
				comment = new CommentDefinition(id, text);
			} else {
				comment = new CommentDefinition(id, text, Integer.valueOf(sort.getStringValue()));
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
	public List parseScoreRange(String scoreRange, Map levels) throws ASIParsingException {
		List rangeValues = new ArrayList();
		Matcher matcher = SCORE_RANGE_PATTERN.matcher(scoreRange);
		while(matcher.find()) {
			double min = (matcher.group(1).trim().equals("-INF")) ? Double.NEGATIVE_INFINITY : Double.parseDouble(matcher.group(1).trim());
			double max = (matcher.group(2).trim().equals("INF")) ? Double.POSITIVE_INFINITY : Double.parseDouble(matcher.group(2).trim());
			String level = matcher.group(3).trim();
			if ( levels.get(level) == null){
				throw new ASIParsingException("undefined level: " + level);
			}
			RangeValue rangeValue = new RangeValue(min, max, (LevelDefinition) levels.get(level));
			rangeValues.add(rangeValue);
		}
		return rangeValues;
	}

	private Map parseDrugs(Node root, Map levels, Map comments, List globalRange) throws ASIParsingException {
		// traverse through the list of Drugs and add them to the list
		Map drugs = new HashMap();

		List drugNodes = root.selectNodes(DRUG_XPATH.getText());
		for(Iterator iterator = drugNodes.iterator(); iterator.hasNext();) {
			Node drug = (Node) iterator.next();
        	String drugName = drug.selectSingleNode(DRUG_NAME_XPATH.getText()).getStringValue().trim();
        	String drugFullName = null;
        	if ( drug.selectSingleNode(DRUG_FULLNAME_XPATH.getText()) != null ) {
        		drugFullName = drug.selectSingleNode(DRUG_FULLNAME_XPATH.getText()).getStringValue().trim();
        	}

        	// get all rules for one drug
        	List ruleNodes = drug.selectNodes(RULE_XPATH.getText());
        	List drugRules = parseRules(ruleNodes,levels, comments, globalRange);
        	drugs.put(drugName, new Drug(drugName, drugFullName, drugRules));
        }
		return drugs;
	}

	private List parseRules(List ruleNodes, Map levels, Map comments, List globalRange) throws ASIParsingException {

		List drugRules = new ArrayList();
		for(Iterator iterator2 = ruleNodes.iterator(); iterator2.hasNext();) {
			Node rule = (Node) iterator2.next();
    		RuleCondition condition = new RuleCondition(rule.selectSingleNode(RULE_CONDITION_XPATH.getText()).getStringValue().trim());

    		List ruleActions = new ArrayList();
    		// attempt to retrieve all of the possible action nodes (e.g.: comment, score range, level)
    		Node commentNode = selectUniqueSingleNode(rule, RULE_COMMENT_XPATH);
    		Node levelNode = selectUniqueSingleNode(rule, RULE_LEVEL_XPATH);
    		Node scoreRangeNode = selectUniqueSingleNode(rule, RULE_SCORERANGE_XPATH);

    		if(commentNode != null) {
    			CommentDefinition definition = (CommentDefinition) getRequiredDefinition(comments, commentNode);
    			ruleActions.add(new CommentAction(definition));
    		}
    		if(levelNode != null) {
    			LevelDefinition definition = (LevelDefinition) getRequiredDefinition(levels, levelNode);
    			ruleActions.add(new LevelAction(definition));
    		}
    		if(scoreRangeNode != null) {
    			// If a global range reference exists map to the global range else parse out a new range
    			List scoreRange;
    			if(scoreRangeNode.selectNodes(RULE_USE_GLOBALRANGE_XPATH.getText()).size() == 1) {
    				if(globalRange.size() == 0) {
    					throw new ASIParsingException("required global range does not exist: " + scoreRangeNode.getPath());
    				}
    				scoreRange = globalRange;
    			} else {
    				scoreRange = parseScoreRange(scoreRangeNode.getStringValue().trim(), levels);
    			}
    			ruleActions.add(new ScoreRangeAction(scoreRange));
    		}
    		if (commentNode == null && levelNode == null && scoreRangeNode == null) {
    			throw new ASIParsingException("no action exists for rule: " + rule.getPath()+ "/ \n" + condition.getStatement());
    		}

    		drugRules.add(new Rule(condition, ruleActions));
    	}


		return drugRules;
	}

	private Map parseDrugClasses(Node root, Map drugs) throws ASIParsingException {
		Set tagDefinedDrugNames = new HashSet();
		tagDefinedDrugNames.addAll(drugs.keySet());

		Map drugClasses = new HashMap();
		List nodes = root.selectNodes(DRUG_CLASS_XPATH .getText());
		/*
		 * for every drug class node create a DrugClass object
		 */
		for (Iterator iter = nodes.iterator(); iter.hasNext();) {
			Node drugClassNode = (Node) iter.next();
			String className = selectUniqueSingleNode(drugClassNode,DRUG_CLASS_NAME_XPATH).getStringValue().trim();
			String drugListStr = selectUniqueSingleNode(drugClassNode,DRUG_CLASS_DRUGLIST_XPATH).getStringValue().trim();
			String[] drugNames = drugListStr.split(",");

			Set drugList = new HashSet();
			for (int i = 0; i < drugNames.length; i++) {
				Drug drug = (Drug) drugs.get(drugNames[i].trim());
				if(drug == null) {
					throw new ASIParsingException(drugNames[i].trim() + " has not been defined as a drug.");
				}
				if (!isUniqueDefinedDrug(drug.getDrugName(), drugClasses)){
					throw new ASIParsingException("The drug: " +drug.getDrugName() + "; has been defined for more than one drug class.");
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

		if (tagDefinedDrugNames.size()>0){
			throw new ASIParsingException("The following drugs have not been associated with a drug class: " + tagDefinedDrugNames.toString());
		}

		return drugClasses;
	}


	private Map parseGenes(Node root, Map drugClasses) throws ASIParsingException {
		List nodes = root.selectNodes(GENE_DEFINITION_XPATH.getText());
		if (nodes.size() == 0){
			throw new ASIParsingException("no gene specified");
		}

		Map genes = new HashMap(2 * nodes.size());
		/*
		 * create a map of genes
		 * every gene has associated a list of DrugClass objects
		 */
		for(Iterator iterator = nodes.iterator(); iterator.hasNext();) {
			Node node = (Node) iterator.next();
			String geneName = node.selectSingleNode(GENE_DEFINITION_NAME_XPATH.getText()).getStringValue().trim();
			/*
			 * get the names of drug classes
			 */
			//String drugClassListStr = selectUniqueSingleNode(node,GENE_DRUGCLASSLIST_XPATH).getStringValue().trim();
			List drugClassListNodes =  node.selectNodes(GENE_DEFINITION_DRUGCLASSLIST_XPATH.getText().trim());
			if (drugClassListNodes.size() > 1){
				throw new ASIParsingException("duplicate node "+GENE_DEFINITION_DRUGCLASSLIST_XPATH.getText());
			}

			Set drugClassSet = new HashSet();
			if (drugClassListNodes.size() == 1){
				String drugClassListStr = ((Node)drugClassListNodes.get(0)).getStringValue().trim();
				if (drugClassListStr.trim().equals("")){
					throw new ASIParsingException("drug class list missing for gene "+ geneName);
				}
				String[] drugClassNames = drugClassListStr.split(",");
				/*
				 * create the DrugClass list
				 */
				for (int i = 0; i < drugClassNames.length; i++) {
					drugClassSet.add(drugClasses.get(drugClassNames[i].trim()));
				}

			}
			genes.put(geneName, new Gene(geneName, drugClassSet));
		}
		return genes;
	}

	private Map parseGeneMutationComments(Node root, Map levels, Map comments, List globalRange) throws ASIParsingException {
		/*
		 * get all the gene nodes specified in GENE_MUTATION_COMMENTS
		 */
		List nodes = root.selectNodes(GENE_MUTATION_COMMENTS_XPATH.getText().trim());
		Map genes = new HashMap(2 * nodes.size());
		/*
		 * for every gene node
		 */
		for (Iterator iterator = nodes.iterator(); iterator.hasNext();) {
			Node geneNode = (Node) iterator.next();
			Node geneNameNode = selectUniqueSingleNode(geneNode,GENE_MUTATION_COMMENTS__NAME_XPATH);
			/*
			 * if no gene name throw an ASIParsingException
			 */
			if (geneNameNode == null){
				throw new ASIParsingException("no gene name");
			}

			/*
			 * get the gene rules
			 */
			List geneRuleNodes = geneNode.selectNodes(GENE_RULE_XPATH.getText().trim());


			if (geneRuleNodes.size() == 0){
				/*
				 * no rules for the current gene
				 */
				throw new ASIParsingException("no rule for gene "+geneNameNode.getText());
			}

			String geneName = geneNameNode.getText().trim();
			List geneRules = parseRules(geneRuleNodes, levels, comments, globalRange);
        	/*
        	 * for every gene rule
        	 */

			genes.put(geneName, new Gene(geneName, geneRules));
       	}

		return genes;
	}

	private Map<String,ResultCommentDrug> parseResultComments(Node root, Map levels, Map comments, Map definedDrugs) throws ASIParsingException {
		Map<String,ResultCommentDrug> drugs = new HashMap<String,ResultCommentDrug>();

		//Get all the result comment drug nodes
		List<Node> nodes = root.selectNodes(RESULT_COMMENTS_XPATH.getText().trim());


		//for each drug node, get the name and rules
		for (Node resultCommentDrugNode: nodes){

			Node drugNameNode = selectUniqueSingleNode(resultCommentDrugNode,RESULT_COMMENT_DRUG_NAME);
			// If no drug, throw an ASIParsingException
			if (drugNameNode == null){
				throw new ASIParsingException("no drug specified for result comment");
			}

			String drugName = drugNameNode.getText().trim();
			// If drug wasn't defined, throw an ASIParsingException
			if (!definedDrugs.containsKey(drugName)){
				throw new ASIParsingException("\""+drugName+"\" has result comments but is not defined as a drug");
			}

			//Get the level rule(s)
			List<Node> levelRuleNodes = resultCommentDrugNode.selectNodes(RESULT_COMMENT_LEVEL_RULE.getText().trim());

			if (levelRuleNodes.size() == 0){
				//No rules for current drug
				throw new ASIParsingException("no level rule specified for drug "+drugNameNode.getText());
			}

			List<LevelRule> drugRules = parseLevelRules(levelRuleNodes,levels,comments);
			drugs.put(drugName,new ResultCommentDrug(drugName,drugRules));
		}

		return drugs;
	}

	private boolean isUniqueDefinedDrug(String drugName, Map drugClasses) {
		/*
		 * search for every class if the drug is already associated with a different one
		 */
		for (Iterator iterator = drugClasses.keySet().iterator(); iterator.hasNext();) {
			String className = (String) iterator.next();
			DrugClass drugClass = (DrugClass)drugClasses.get(className);
			Set drugList = drugClass.getDrugs();
			/*
			 * for every drug of the class
			 */
			for (Iterator iterator2 = drugList.iterator(); iterator2.hasNext();) {
				Drug drug = (Drug) iterator2.next();
				if (drugName.equals(drug.getDrugName())){
					return false;
				}
			}
		}
		return true;
	}

	private Node selectUniqueSingleNode(Node parent, XPath xpath) throws ASIParsingException {
		List nodes = parent.selectNodes(xpath.getText());
		if(nodes.size() > 1) {
			throw new ASIParsingException("unique node: " + xpath.getText() + ", does not exist within parent: " + parent.getPath());
		}
		return (nodes.size() == 0) ? null : (Node) nodes.get(0);
	}

	private Definition getRequiredDefinition(Map definitions, Node key) throws ASIParsingException {
		Object obj = definitions.get(key.getStringValue().trim());
		if(obj == null) {
			throw new ASIParsingException("required definition: " + key.getPath() + " does not exist.");
		}
		return (Definition) obj;
	}
	/**
	 * Returns a map of metadata about algorithm XML file passed in as is argument.
	 *
	 * @param	is InputStream of algorithm XML file
	 * @return	Map of metadata about algorithm XML file
	 */
	@Override
	public Map getAlgorithmInfo(InputStream is) throws ASIParsingException {
		//TODO this should return an object AlgorithmInfo instead of a Map; when someone changes a key name it affects the applications using it.
		Document doc = null;
        try {
            SAXReader saxReader = new SAXReader(this.validateXml);
            saxReader.setEntityResolver(RESOLVER);
            doc = saxReader.read(new InputStreamReader(is));
            doc.getDocument().normalize();
        } catch(DocumentException de) {
            throw new ASIParsingException("Not a Stanford resistance analysis XML file", de);
        }

        Map map = new HashMap();

        Map algNameVersionDate = parseForAlgNameVersionDate(doc);
        map.put("ALGNAME_ALGVERSION_ALGDATE", algNameVersionDate);
        map.put("ALGNAME_ALGVERSION", algNameVersionDate);

        // get the lowest levelDefinition as defined when the order = 1
        LevelDefinition lowestLevelDefinition = (LevelDefinition) createLevelMap(doc).get("1");
        Map lowestLevelOriginalSir = new HashMap();
        lowestLevelOriginalSir.put("ORIGINAL", lowestLevelDefinition.getText());
        lowestLevelOriginalSir.put("SIR", lowestLevelDefinition.getSir());
        map.put("ORDER1_ORIGINAL_SIR", lowestLevelOriginalSir);

        Map drugAndFullNames = parseForDrugAndFullNames(doc);
        map.put("DRUG_FULLNAME", drugAndFullNames);

        Map drugClassAndDrugs = parseForDrugClassesAndDrugs(doc,drugAndFullNames);
        map.put("DRUGCLASS_DRUGLIST", drugClassAndDrugs);

        Map geneAndDrugClasses = parseForGeneAndDrugClasses(doc, drugClassAndDrugs);
        map.put("GENE_DRUGCLASSLIST", geneAndDrugClasses);

        return map;
	}

	/**
	 * returns hash with algorithm name, version, and date
	 * @param root
	 * @return
	 * @throws ASIParsingException
	 */
	private Map parseForAlgNameVersionDate(Node root) throws ASIParsingException {
		// traverse through the list of Drugs and add them to the list
		Map algInfo = new HashMap();

		String algName = root.selectSingleNode(ALGORITHM_NAME_XPATH.getText()).getStringValue().trim();
		String algVersion = root.selectSingleNode(ALGORITHM_VERSION_XPATH.getText()).getStringValue().trim();

		// must check because algorithm version was added later on
		String algDate = "NA";
		if ( root.selectSingleNode(ALGORITHM_DATE_XPATH.getText()) != null )
			algDate = root.selectSingleNode(ALGORITHM_DATE_XPATH.getText()).getStringValue().trim();

		algInfo.put("ALGNAME", algName);
		algInfo.put("ALGVERSION", algVersion);
		algInfo.put("ALGDATE", algDate);

		return algInfo;
	}

	// derived from parseDrugs() above; except that for efficiency we don't want the rules
	// returns: a HashMap<String, String> drugName => drugFullName
	private Map parseForDrugAndFullNames(Node root) throws ASIParsingException {
		// traverse through the list of Drugs and add them to the list
		Map drugs = new HashMap();

		List drugNodes = root.selectNodes(DRUG_XPATH.getText());
		for(Iterator iterator = drugNodes.iterator(); iterator.hasNext();) {
			Node drug = (Node) iterator.next();
	    	String drugName = drug.selectSingleNode(DRUG_NAME_XPATH.getText()).getStringValue().trim();
	    	String drugFullName = null;
	    	if ( drug.selectSingleNode(DRUG_FULLNAME_XPATH.getText()) != null ) {
	    		drugFullName = drug.selectSingleNode(DRUG_FULLNAME_XPATH.getText()).getStringValue().trim();
	    	}

	    	drugs.put(drugName, drugFullName);
	    }
		return drugs;
	}

	// derived from parseDrugClasses() above; except that for efficiency we don't want the rules and thus no Drug objects
	private Map parseForDrugClassesAndDrugs(Node root, Map drugs) throws ASIParsingException {
		Set tagDefinedDrugNames = new HashSet();
		tagDefinedDrugNames.addAll(drugs.keySet());

		Map drugClasses = new HashMap();
		List nodes = root.selectNodes(DRUG_CLASS_XPATH .getText());
		/*
		 * for every drug class node create a DrugClass object
		 */
		for (Iterator iter = nodes.iterator(); iter.hasNext();) {
			Node drugClassNode = (Node) iter.next();
			String className = selectUniqueSingleNode(drugClassNode,DRUG_CLASS_NAME_XPATH).getStringValue().trim();
			String drugListStr = selectUniqueSingleNode(drugClassNode,DRUG_CLASS_DRUGLIST_XPATH).getStringValue().trim();
			String[] drugNames = drugListStr.split(",");

			Set drugList = new HashSet();
			for (int i = 0; i < drugNames.length; i++) {
				String drugName = drugNames[i].trim();
				if( !drugs.containsKey(drugName) ) {
					throw new ASIParsingException(drugName + " has not been defined as a drug.");
				}
				if (!isUniqueDefinedDrug2(drugName, drugClasses)){
					throw new ASIParsingException("The drug: " +drugName + "; has been defined for more than one drug class.");
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

		if (tagDefinedDrugNames.size()>0){
			throw new ASIParsingException("The following drugs have not been associated with a drug class: " + tagDefinedDrugNames.toString());
		}

		return drugClasses;
	}

	// derived from isUniqueDefinedDrug() above; except that for efficiency we don't want the rules	and thus no Drug objects
	private boolean isUniqueDefinedDrug2(String inDrugName, Map drugClasses) {
		/*
		 * search for every class if the drug is already associated with a different one
		 */
		for (Iterator iterator = drugClasses.keySet().iterator(); iterator.hasNext();) {
			String className = (String) iterator.next();
			Set drugList = (Set) drugClasses.get(className);
			/*
			 * for every drug of the class
			 */
			if ( drugList.contains(inDrugName) )
				return false;
		}
		return true;
	}

	// derived from parseGenes() above; except that for efficiency we don't want the rules and thus no Drug objects
	private Map parseForGeneAndDrugClasses(Node root, Map drugClasses) throws ASIParsingException {
		List nodes = root.selectNodes(GENE_DEFINITION_XPATH.getText());
		if (nodes.size() == 0){
			throw new ASIParsingException("no gene specified");
		}

		Map genes = new HashMap(2 * nodes.size());
		/*
		 * create a map of genes
		 * every gene has associated a list of DrugClass objects
		 */
		for(Iterator iterator = nodes.iterator(); iterator.hasNext();) {
			Node node = (Node) iterator.next();
			String geneName = node.selectSingleNode(GENE_DEFINITION_NAME_XPATH.getText()).getStringValue().trim();
			/*
			 * get the names of drug classes
			 */
			//String drugClassListStr = selectUniqueSingleNode(node,GENE_DRUGCLASSLIST_XPATH).getStringValue().trim();
			List drugClassListNodes =  node.selectNodes(GENE_DEFINITION_DRUGCLASSLIST_XPATH.getText().trim());
			if (drugClassListNodes.size() > 1){
				throw new ASIParsingException("duplicate node "+GENE_DEFINITION_DRUGCLASSLIST_XPATH.getText());
			}

			Set drugClassSet = new HashSet();
			if (drugClassListNodes.size() == 1){
				String drugClassListStr = ((Node)drugClassListNodes.get(0)).getStringValue().trim();
				if (drugClassListStr.trim().equals("")){
					throw new ASIParsingException("drug class list missing for gene "+ geneName);
				}
				String[] drugClassNames = drugClassListStr.split(",");
				/*
				 * create the DrugClass list
				 */
				for (int i = 0; i < drugClassNames.length; i++) {
					String drugClassName = drugClassNames[i].trim();
					if ( drugClasses.containsKey(drugClassName) )
						drugClassSet.add(drugClassName);
					else
						throw new ASIParsingException(drugClassName + " has not been defined as a drugClass.");

				}

			}
			genes.put(geneName, drugClassSet);
		}
		return genes;
	}

	private List<LevelRule> parseLevelRules(List<Node> ruleNodes, Map levels, Map comments) throws ASIParsingException{
		List<LevelRule> rules = new ArrayList<LevelRule>();

		for (Node ruleNode: ruleNodes){

			// Get the level conditions
			Node levelConditionNode = selectUniqueSingleNode(ruleNode,RESULT_COMMENT_LEVEL_CONDITION);
			//if no level condition, throw an ASIParsingException
			if (levelConditionNode == null){
				throw new ASIParsingException("no level condition specified in level rule");
			}

			LevelCondition levelCondition = parseLevelCondition(levelConditionNode,levels);//parse ltes and stuff

			Node levelActionNode = selectUniqueSingleNode(ruleNode,RESULT_COMMENT_LEVEL_ACTION);
			//if no level action, throw an ASIParsingException
			if (levelActionNode == null){
				throw new ASIParsingException("no level action specified for result comment");
			}
			List<CommentAction> levelActions = parseLevelActions(levelActionNode,comments);

			rules.add(new LevelRule(levelCondition,levelActions));
		}

		return rules;

	}

	private LevelCondition parseLevelCondition(Node levelConditionNode,Map levels) throws ASIParsingException{
		//search levelConditionNode for each of the comparison operators
		//	Treat this like actions where there can be multiple, and throw exception if there are none

		LevelCondition levelCondition = new LevelCondition();

		//find elements and call addComparison if they exist

		Node LTENode = selectUniqueSingleNode(levelConditionNode, LTE);
		Node GTENode = selectUniqueSingleNode(levelConditionNode, GTE);
		Node LTNode = selectUniqueSingleNode(levelConditionNode, LT);
		Node GTNode = selectUniqueSingleNode(levelConditionNode, GT);
		Node EQNode = selectUniqueSingleNode(levelConditionNode, EQ);
		Node NEQNode = selectUniqueSingleNode(levelConditionNode, NEQ);

		boolean anyNodeSpecified = false;

		if (LTENode != null){
			String levelString = LTENode.getText();
			Integer level = getValidatedLevelFromString(levelString,levels);
			levelCondition.addComparison(level,"LTE");
			anyNodeSpecified = true;
		}
		if (GTENode != null){
			String levelString = GTENode.getText();
			Integer level = getValidatedLevelFromString(levelString,levels);
			levelCondition.addComparison(level,"GTE");
			anyNodeSpecified = true;
		}
		if (LTNode != null){
			String levelString = LTNode.getText();
			Integer level = getValidatedLevelFromString(levelString,levels);
			levelCondition.addComparison(level,"LT");
			anyNodeSpecified = true;
		}
		if (GTNode != null){
			String levelString = GTNode.getText();
			Integer level = getValidatedLevelFromString(levelString,levels);
			levelCondition.addComparison(level,"GT");
			anyNodeSpecified = true;
		}
		if (EQNode != null){
			String levelString = EQNode.getText();
			Integer level = getValidatedLevelFromString(levelString,levels);
			levelCondition.addComparison(level,"EQ");
			anyNodeSpecified = true;
		}
		if (NEQNode != null){
			String levelString = NEQNode.getText();
			Integer level = getValidatedLevelFromString(levelString,levels);
			levelCondition.addComparison(level,"NEQ");
			anyNodeSpecified = true;
		}

		if (!anyNodeSpecified){
			throw new ASIParsingException("no level comparison specified in level condition");
		}

		return levelCondition;
	}

	private Integer getValidatedLevelFromString(String levelString, Map levels) throws ASIParsingException{
		Integer level;

		//validate as integer
		try{
			level = Integer.parseInt(levelString);
		} catch (NumberFormatException e) {
			throw new ASIParsingException("specified level order \""+levelString + "\" is not an integer");
		}

		//validate against defined levels - level map uses string keys, so use the levelString
		if (!levels.containsKey(levelString)){
			throw new ASIParsingException(levelString + " has not been defined as a level order");
		}

		return level;
	}

	private List<CommentAction> parseLevelActions(Node levelActionNode,Map comments) throws ASIParsingException{

		List<CommentAction> actions = new ArrayList();

		//get comment node from LEVEL_ACTION
		Node commentNode = selectUniqueSingleNode(levelActionNode,RESULT_COMMENT_LEVEL_ACTION_COMMENT_XPATH);
		//if no comment, throw parsing exception
		if (commentNode == null){
			throw new ASIParsingException("no comment specified for level action");
		}

		CommentDefinition definition = (CommentDefinition) getRequiredDefinition(comments, commentNode);
		actions.add(new CommentAction(definition));

		return actions;
	}




}
