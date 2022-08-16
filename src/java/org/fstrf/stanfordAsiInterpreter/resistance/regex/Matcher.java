package org.fstrf.stanfordAsiInterpreter.resistance.regex;

import com.google.gwt.regexp.shared.MatchResult;
import com.google.gwt.regexp.shared.RegExp;

public class Matcher {
	
	private final RegExp pattern;
	private final String input;
	private MatchResult result;

	public Matcher(String regex, CharSequence input) {
		pattern = RegExp.compile(regex, "g");
		this.input = input.toString();
	}

    public boolean find() {
    	result = pattern.exec(input);
    	return result != null;
    }
    
    public String group(int group) {
    	return result.getGroup(group);
    }
    
    public Boolean matches() {
        result = pattern.exec(input);
        return (
            result != null &&
            result.getIndex() == 0 &&
            pattern.getLastIndex() == input.length()
        );
    }

}
