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



package test.org.fstrf.stanfordAsiInterpreter.resistance;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileWriter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.commons.cli.CommandLine;
import org.apache.commons.cli.GnuParser;
import org.apache.commons.cli.HelpFormatter;
import org.apache.commons.cli.Option;
import org.apache.commons.cli.Options;
import org.apache.commons.cli.ParseException;
import org.fstrf.stanfordAsiInterpreter.resistance.AsiTransformer;
import org.fstrf.stanfordAsiInterpreter.resistance.definition.CommentDefinition;
import org.fstrf.stanfordAsiInterpreter.resistance.definition.Definition;
import org.fstrf.stanfordAsiInterpreter.resistance.definition.Gene;
import org.fstrf.stanfordAsiInterpreter.resistance.evaluate.EvaluatedCondition;
import org.fstrf.stanfordAsiInterpreter.resistance.evaluate.EvaluatedDrug;
import org.fstrf.stanfordAsiInterpreter.resistance.evaluate.EvaluatedDrugClass;
import org.fstrf.stanfordAsiInterpreter.resistance.evaluate.EvaluatedDrugLevelCondition;
import org.fstrf.stanfordAsiInterpreter.resistance.evaluate.EvaluatedGene;
import org.fstrf.stanfordAsiInterpreter.resistance.evaluate.EvaluatedResultCommentRule;
import org.fstrf.stanfordAsiInterpreter.resistance.grammar.AsiGrammarAdapter.ScoredItem;
import org.fstrf.stanfordAsiInterpreter.resistance.grammar.MutationComparator;
import org.fstrf.stanfordAsiInterpreter.resistance.grammar.StringMutationComparator;
import org.fstrf.stanfordAsiInterpreter.resistance.xml.XmlAsiTransformer;

public class AsiInterpreterClient {

    private static Option ASI_FILE_OPTION, MUTATION_LIST_OPTION, STRICT_COMPARISON_OPTION, VALIDATE_XML_OPTION, GENE_OPTION;
    private static Options OPTIONS;

    /**
     * Create the Options the login will be able to specify on the command line.
     */
    static {
        OPTIONS = new Options();

        ASI_FILE_OPTION = new Option("f", "asi-xml-file", true, "asi xml file that defines the algorithm");
        ASI_FILE_OPTION.setArgName("asi_file");
        ASI_FILE_OPTION.setRequired(true);
        OPTIONS.addOption(ASI_FILE_OPTION);

        GENE_OPTION = new Option("g", "gene", true, "name of the gene that the mutations represent, this must match the gene name specified in the asi xml file");
        GENE_OPTION.setArgName("gene");
        GENE_OPTION.setRequired(true);
        OPTIONS.addOption(GENE_OPTION);

        MUTATION_LIST_OPTION = new Option("m", "mutations", true, "comma seperated list of mutations to interpret");
        MUTATION_LIST_OPTION.setArgName("mutations");
        MUTATION_LIST_OPTION.setRequired(false);
        OPTIONS.addOption(MUTATION_LIST_OPTION);

        STRICT_COMPARISON_OPTION = new Option("s", "strict-comparison", false, "mutation amino acids sets must be exact matches");
        OPTIONS.addOption(STRICT_COMPARISON_OPTION);

        VALIDATE_XML_OPTION = new Option("v", "validate-xml", false, "DTD file - validate the asi file by checking it against its dtd");
        VALIDATE_XML_OPTION.setArgName("DTD file");
        OPTIONS.addOption(VALIDATE_XML_OPTION);
    }

    private File asiXmlFile;
    private String geneName;
    private List mutations;
    private boolean strictComparison;
    private boolean validateXml;
    private MutationComparator mutationComparator;
    private String arguments;

    private AsiInterpreterClient(CommandLine commands, String argumentString) {
    	this.strictComparison = commands.hasOption(STRICT_COMPARISON_OPTION.getOpt());
    	this.validateXml = commands.hasOption(VALIDATE_XML_OPTION.getOpt());
    	this.geneName = commands.getOptionValue(GENE_OPTION.getOpt());

    	this.mutationComparator = new StringMutationComparator(this.strictComparison);

    	setAsiXmlFile(commands.getOptionValue(ASI_FILE_OPTION.getOpt()));

    	setMutations(commands.hasOption(MUTATION_LIST_OPTION.getOpt()) ? commands.getOptionValue(MUTATION_LIST_OPTION.getOpt()): null, this.mutationComparator);

    	this.arguments = argumentString;
    }

    private void setAsiXmlFile(String filePath) {
    	try {
    		this.asiXmlFile = new File(filePath);
    	} catch(RuntimeException re) {
    		System.err.println("The following ASI XML file does not exisit: " + filePath);
    		throw re;
    	}
    }

    private void setMutations(String mutationsString, MutationComparator comparator) {
    	if (mutationsString == null || mutationsString.trim() == ""){
    	    this.mutations = new ArrayList<String>();}
    	else {
            this.mutations = Arrays.asList(mutationsString.split(","));

    	}
    	if(!comparator.areMutationsValid(this.mutations)) {
            throw new RuntimeException("Mutations are not valid: " + mutationsString);
        }
    }

    private void run() throws Exception {
    	AsiTransformer transformer = new XmlAsiTransformer(this.validateXml);

    	Map	geneMap = transformer.transform(new FileInputStream(this.asiXmlFile));

    	Gene gene =  (Gene) geneMap.get(this.geneName);
    	if(gene == null) {
    		throw new Exception("Gene: " + this.geneName + ", has not be defined within the XML file: " + this.asiXmlFile);
    	}

    	MutationComparator mutationCompator = new StringMutationComparator(false);
    	if (!mutationComparator.areMutationsValid(this.mutations)){
    	    throw new RuntimeException("Invalid list of mutations: " + this.mutations.toString());
    	}
    	EvaluatedGene evaluatedGene = gene.evaluate(this.mutations, this.mutationComparator);

    	String buffer = renderEvaluatedGene(evaluatedGene);

    	Map algoInfo = (Map) transformer.getAlgorithmInfo(new FileInputStream(this.asiXmlFile)).get("ALGNAME_ALGVERSION_ALGDATE");
    	System.out.println("ALGNAME:" + (algoInfo.get("ALGNAME") == null? "NA":algoInfo.get("ALGNAME")) + "\n");
    	System.out.println("ALGVERSION:" + (algoInfo.get("ALGVERSION") == null ? "NA":algoInfo.get("ALGVERSION"))+ "\n");
    	System.out.println("ALGDATE:" + (algoInfo.get("ALGDATE") == null ? "NA":algoInfo.get("ALGDATE")) + "\n");
    	System.out.println("\n\n");
    	System.out.println(buffer);

    	BufferedWriter outputStream = new BufferedWriter(new FileWriter("evaluatedGene.txt"));
    	outputStream.write("Arguments: " + this.arguments);
    	outputStream.write("\n");
    	outputStream.write("ALGNAME:" + algoInfo.get("ALGNAME")+ "\n");
    	outputStream.write("ALGVERSION:" + algoInfo.get("ALGVERSION")+ "\n");
    	outputStream.write("ALGDATE:" + algoInfo.get("ALGDATE")+ "\n");
    	outputStream.write("\n\n");
		outputStream.write(buffer.toString());
		outputStream.flush();
		outputStream.close();

    }

    private String renderEvaluatedGene(EvaluatedGene gene) {
    	StringBuffer buffer = new StringBuffer();
    	buffer.append("Gene: " + gene.getGene()).append('\n');
    	buffer.append("Evaluated Drug Classes:").append('\n');
    	for(Iterator iter = gene.getEvaluatedDrugClasses().iterator(); iter.hasNext();) {
			EvaluatedDrugClass drugClass = (EvaluatedDrugClass) iter.next();
			buffer.append("\t").append("Drug Class: " + drugClass.getDrugClass()).append('\n');
			buffer.append("\t").append("Evaluated Drugs:").append('\n');
			for(Iterator iter1 = drugClass.getEvaluatedDrugs().iterator(); iter1.hasNext();) {
				EvaluatedDrug drug = (EvaluatedDrug) iter1.next();
				buffer.append("\t\t").append("Drug: " + drug.getDrug()).append('\n');
				buffer.append("\t\t").append("Drug Full Name: " + drug.getDrug().getDrugFullName()).append('\n');
				buffer.append("\t\t").append("Scored Mutations: " + drug.getScoredMutations()).append('\n');
				String level = (drug.getHighestLevelDefinition() != null) ? drug.getHighestLevelDefinition().getResistance() : "" ;
				buffer.append("\t\t").append("Level: " + ((drug.getHighestLevelDefinition() != null) ? drug.getHighestLevelDefinition().toString() : "")).append('\n');
				buffer.append("\t\t").append("Comments:").append('\n');
				for(Iterator iter2 = drug.getCommentDefinitions().iterator(); iter2.hasNext();) {
					CommentDefinition definition = (CommentDefinition) iter2.next();
					buffer.append("\t\t\t").append("Comment: " + definition.toString()).append('\n');
				}
				buffer.append("\t\t").append("Evaluated Conditions:").append('\n');
				for(Iterator iter2 = drug.getEvaluatedConditions().iterator(); iter2.hasNext();) {
					EvaluatedCondition condition = (EvaluatedCondition) iter2.next();
					buffer.append("\t\t\t").append("Condition: " + condition.getRuleCondition()).append('\n');
					buffer.append("\t\t\t").append("Result: " + condition.getEvaluator().getResult()).append('\n');
					if(!condition.getEvaluator().getResult().getClass().equals(Boolean.class)) {
						buffer.append("\t\t\t").append("Scored Items: ").append('\n');
						for(Iterator iter3 = condition.getEvaluator().getScoredItems().iterator(); iter3.hasNext();) {
							ScoredItem scoredItem = (ScoredItem) iter3.next();
							buffer.append("\t\t\t\t").append("Scored Item: " + scoredItem.getValue()).append('\n');
							buffer.append("\t\t\t\t").append("Scored Item Mutations: " + scoredItem.getMutations()).append('\n');
						}
						buffer.append('\n');
					}
				}
				buffer.append('\n');
			}
			buffer.append('\n');
		}
    	buffer.append("Gene Comments:").append('\n');
    	for(Iterator iter = gene.getGeneEvaluatedConditions().iterator(); iter.hasNext();) {
			EvaluatedCondition condition = (EvaluatedCondition) iter.next();
			if(condition.getDefinitions().size() == 0)
				continue;
			buffer.append("\t").append("Condition: " + condition.getRuleCondition()).append('\n');
			buffer.append("\t").append("Scored Mutations: " + condition.getEvaluator().getScoredMutations()).append('\n');
			buffer.append("\t").append("Definitions: ").append('\n');
			for(Iterator iter2 = condition.getDefinitions().iterator(); iter2.hasNext();) {
				CommentDefinition definition = (CommentDefinition) iter2.next();
				buffer.append("\t\t").append("Comment: " + definition.toString()).append('\n');
			}
			buffer.append('\n');
		}
    	buffer.append("Result Comments:").append('\n');
    	for (EvaluatedResultCommentRule evaluatedResultCommentRule: gene.getEvaluatedResultCommentRules()) {
    		//skip rules that don't apply (no definitions means the rule conditions were not met)
    		if (evaluatedResultCommentRule.getDefinitions().size() == 0) {
    			continue;
    		}
    		buffer.append("\t").append("Drug Level Conditions:").append("\n");
    		for (EvaluatedDrugLevelCondition condition: evaluatedResultCommentRule.getEvaluatedDrugLevelConditions()) {
    			buffer.append("\t\t").append("Condition: "+condition.getDrugLevelCondition()).append("\n");
    			buffer.append("\t\t\t").append("Scored Level for "+condition.getDrug()+": "+condition.getScoredLevel().toString()).append('\n');
    		}
    		buffer.append("\t").append("Definitions:").append("\n");
    		for(Definition definition: evaluatedResultCommentRule.getDefinitions()) {
				buffer.append("\t\t").append("Comment: " + definition.toString()).append('\n');
			}
			buffer.append('\n');
    	}

    	return buffer.toString();
    }

    /**
     * Print help for the Options given
     *
     * @param options the options to print help for
     */
    private static void printHelp(Options options) {
        HelpFormatter formatter = new HelpFormatter();
        formatter.printHelp("ASI Interpreter", options, true);
    }

	/**
	 * @param args
	 */
	public static void main(String[] args) {
        try {
            System.out.println("Testing mutations");
            CommandLine commands = new GnuParser().parse(OPTIONS, args);
            AsiInterpreterClient asiInterpreterClient = new AsiInterpreterClient(commands, Arrays.asList(args).toString());
            asiInterpreterClient.run();
        } catch(ParseException pe) {
            System.err.println("Invalid parameter list.");
            printHelp(OPTIONS);
        } catch(Exception e) {
        	System.err.println(e.getMessage());
        	e.printStackTrace(System.err);
        }
	}

}
