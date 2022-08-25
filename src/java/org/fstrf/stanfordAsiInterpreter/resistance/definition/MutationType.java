package org.fstrf.stanfordAsiInterpreter.resistance.definition;

import java.util.List;

/**
 * Class defining a Mutation Type, retrieved from the MUTATION_TYPE tag inside the DRUG tag in the algorithm file.
 * If any indels listed in <code>mutations</code> are present, they will be output along with the <code>name</code>
 */
public class MutationType
{
    private String name;
    private List<String> mutations;

    public MutationType(String name, List<String> mutations) {
        this.name = name;
        this.mutations = mutations;
    }

    public String getName()
    {
        return name;
    }

    public void setName(String name)
    {
        this.name = name;
    }

    public List<String> getMutations()
    {
        return mutations;
    }

    public void setMutations(List<String> mutations)
    {
        this.mutations = mutations;
    }
}
