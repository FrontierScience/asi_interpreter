package org.fstrf.stanfordAsiInterpreter.cli;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.PrintStream;
import java.io.Reader;
import java.util.Arrays;
import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.Map;
import java.util.Set;
import java.util.TreeSet;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVRecord;
import org.fstrf.stanfordAsiInterpreter.resistance.ASIEvaluationException;
import org.fstrf.stanfordAsiInterpreter.resistance.ASIParsingException;
import org.fstrf.stanfordAsiInterpreter.resistance.definition.Drug;
import org.fstrf.stanfordAsiInterpreter.resistance.definition.DrugClass;
import org.fstrf.stanfordAsiInterpreter.resistance.definition.Gene;
import org.fstrf.stanfordAsiInterpreter.resistance.definition.LevelDefinition;
import org.fstrf.stanfordAsiInterpreter.resistance.evaluate.EvaluatedDrug;
import org.fstrf.stanfordAsiInterpreter.resistance.grammar.StringMutationComparator;
import org.fstrf.stanfordAsiInterpreter.resistance.xml.XmlAsiTransformer;

public class CLIInterpreter {
	public static void main(String[] args) throws ASIParsingException, IOException, ASIEvaluationException {
		if (args.length != 2) {
			System.err.println("asi_interpreter asi.xml mutations.csv");
			System.exit(0);
		}
		
		File asiXml = new File(args[0]);
		File mutationsCsv = new File(args[1]);
		
		PrintStream out = System.out;
		
		XmlAsiTransformer t = new XmlAsiTransformer(true);
		//TODO: always same order? Return a LinkedHashSet of genes?
		Map<String, Gene> genes = t.transform(new FileInputStream(asiXml));
		
		//header
		out.print("id");
		Map<Drug, Gene> drugGenes = new HashMap<Drug, Gene>();
		Set<Drug> drugs = new LinkedHashSet<Drug>();
		for(String gene: new TreeSet<String>(genes.keySet())) {
			Gene g = genes.get(gene);
			//TODO: always same order? Return a LinkedHashSet?
			Set<DrugClass> classes = g.getDrugClasses();
			for (DrugClass dc : classes) {
				//TODO: always same order? Return a LinkedHashSet?
				Set<Drug> _drugs = dc.getDrugs();
				for (Drug d : _drugs) {
					drugs.add(d);
					drugGenes.put(d, g);
					out.print("," + quote(d.getDrugName() + "_" + "SIR"));
					out.print("," + quote(d.getDrugName() + "_" + "GSS"));
					//TODO: add the mutation list as well?
				}
			}
		}
		out.print("\n");
		
		Reader in = new FileReader(mutationsCsv);
		Iterable<CSVRecord> records = CSVFormat.DEFAULT.withHeader().parse(in);
		for (CSVRecord record : records) {
		    String id = record.get("id");
		    out.print(id);
		    
		    Map<Gene, String> mutations = new HashMap<Gene, String>();
		    for (Gene g : genes.values()) {
		    	if (record.isMapped(g.getName())) {
			    	String m = record.get(g.getName());
			    	mutations.put(g, m);
		    	} else {
		    		mutations.put(g, null);
		    	}
		    }
		    for (Drug d : drugs) {
		    	//TODO: when the list of muts is empty, 
		    	//this can mean that there is no info on the regio or no mutations in the region
		    	//Should we pass the alignment i.s.o. mutation lists?
		    	Gene g = drugGenes.get(d);
		    	String muts = mutations.get(g);
		    	if (muts !=null) {
			    	EvaluatedDrug ed = d.evaluate(Arrays.asList(muts.split(" ")), new StringMutationComparator(true));
			    
			    	//TODO: highest, is this right?
			    	//TODO: what does it mean when this is null?
			    	LevelDefinition def = ed.getHighestLevelDefinition();
			    	if (def != null) {
				    	out.print("," + quote(def.getSir()));		    	
				    	//TODO: how to get the GSS
				    	double gss = -1;
				    	out.print("," + quote(gss + ""));
				    } else {
				    	out.print(",-");
			    		out.print(",-");
				    }
		    	} else {
		    		out.print(",-");
		    		out.print(",-");
		    	}
		    }
		    out.print("\n");
		}
	}
	
	private static String quote(String s) {
		return "\"" + s + "\"";
	}
}
