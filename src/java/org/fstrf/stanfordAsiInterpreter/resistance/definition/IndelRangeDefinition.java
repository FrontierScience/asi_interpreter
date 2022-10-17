package org.fstrf.stanfordAsiInterpreter.resistance.definition;

import java.util.List;

/**
 * Class defining the range for indels, retrieved from the INDEL_RANGE_DEFINITION tag inside the GENE_DEFINITION tag in the algorithm file.
 * Any encountered indels listed in <code>input</code> will be treated as having the same resistance as the indel in <code>output</code>.
 *
 */
public class IndelRangeDefinition
{
    private List<String> input;
    private String output;

    public IndelRangeDefinition(List<String> input, String output)
    {
        this.input = input;
        this.output = output;
    }

    public List<String> getInput()
    {
        return input;
    }
    public void setInput(List<String> input)
    {
        this.input = input;
    }
    public String getOutput()
    {
        return output;
    }
    public void setOutput(String output)
    {
        this.output = output;
    }



}
