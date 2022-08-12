package org.fstrf.stanfordAsiInterpreter.resistance.regex;

public class Pattern {
	
	private final String regex;
	
	private Pattern(String regex) {
		this.regex = regex;
	}

    public static Pattern compile(String regex) {
        return new Pattern(regex);
    }
    
    
    public Matcher matcher(CharSequence input) {
    	return new Matcher(regex, input);
    }

}
