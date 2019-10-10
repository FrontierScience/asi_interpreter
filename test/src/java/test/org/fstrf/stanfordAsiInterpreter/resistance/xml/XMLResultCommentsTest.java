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

package test.org.fstrf.stanfordAsiInterpreter.resistance.xml;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;

import org.fstrf.stanfordAsiInterpreter.resistance.ASIParsingException;
import org.fstrf.stanfordAsiInterpreter.resistance.AsiTransformer;
import org.fstrf.stanfordAsiInterpreter.resistance.xml.XmlAsiTransformer;

import junit.framework.TestCase;

/**
 * This class tests the library's validation of ResultComment contents in the XML,
 * pulling together both the validation from the DTD and from the XML-parsing code
 */
public class XMLResultCommentsTest extends TestCase
{
    private boolean validateXml;

    @Override
    public void setUp() {
        this.validateXml = true;
    }

    private void attemptTransformation(String filePath) throws FileNotFoundException, Exception {
    	AsiTransformer transformer = new XmlAsiTransformer(this.validateXml);
    	File algorithmFile = new File(filePath);
    	transformer.transform(new FileInputStream(algorithmFile));
    }

    public void testValidResultComment() {
    	//Normal file -- Should be no errors
    	System.out.println("Normal Use Result Comments");
        try {
        	attemptTransformation("test/files/result_based_comments/KPL_1.1.xml");
        } catch (Exception e) {
        	e.printStackTrace();
            fail(e.getMessage());
            e.printStackTrace();
        }
        System.out.println("\t==> No Errors");
    }

    public void testNoResultComments() {
    	//No Result Comments - should be no errors
    	System.out.println("No Result Comments");
        try {
        	attemptTransformation("test/files/regression_testing/HIVDB_7.0.xml");
        } catch (Exception e) {
            fail(e.getMessage());
            e.printStackTrace();
        }
        System.out.println("\t==> No Errors");
    }

    public void testEmptyResultComments() {
    	//Empty Result Comments - should be no errors
    	System.out.println("Empty Result Comments");
    	try {
    		attemptTransformation("test/files/result_based_comments/EmptyResultComments.xml");
    	} catch (Exception e) {
            fail(e.getMessage());
            e.printStackTrace();
        }
    	System.out.println("\t==> No Errors");
    }

    public void testResultCommentRuleWithNoCondition() {
    	boolean exceptionTriggered = false;
    	System.out.println("Result Comment Rule with no conditions");
    	try {
    		attemptTransformation("test/files/result_based_comments/ResultCommentRuleWithNoCondition.xml");
    	} catch (ASIParsingException e) {
    		System.out.println("\t==> "+e.getCause());
    		assert(e.getCause().getMessage().contains("The content of element type \"RESULT_COMMENT_RULE\" is incomplete"));
    		exceptionTriggered = true;
        } catch (Exception e) {
        	System.out.println("Unexpected error: "+e.toString());
        	fail(e.getMessage());
        }
    	if (!exceptionTriggered) {
    		fail("Result Comment Rule with no condition should trigger validation error");
    	}
    }

    public void testResultCommentRuleWithEmptyConditions() {
    	boolean exceptionTriggered = false;
    	System.out.println("Result Comment Rule with Empty conditions");
    	try {
    		attemptTransformation("test/files/result_based_comments/ResultCommentRuleWithEmptyConditions.xml");
    	} catch (ASIParsingException e) {
    		System.out.println("\t==> "+e.getCause());
    		assert(e.getCause().getMessage().contains("The content of element type \"DRUG_LEVEL_CONDITIONS\" is incomplete"));
    		exceptionTriggered = true;
        } catch (Exception e) {
        	System.out.println("Unexpected error: "+e.toString());
        	fail(e.getMessage());
        }
    	if (!exceptionTriggered) {
    		fail("Result Comment Rule with empty conditions should trigger validation error");
    	}
    }

    public void testResultCommentRuleWithNoActions() {
    	boolean exceptionTriggered = false;
    	System.out.println("Result Comment Rule with no actions");
    	try {
    		attemptTransformation("test/files/result_based_comments/ResultCommentRuleWithNoActions.xml");
    	} catch (ASIParsingException e) {
    		System.out.println("\t==> "+e.getCause());
    		assertEquals(e.getMessage(),"Not a Stanford resistance analysis XML file");
    		exceptionTriggered = true;
        } catch (Exception e) {
        	System.out.println("Unexpected error: "+e.toString());
        	fail(e.getMessage());
        }
    	if (!exceptionTriggered) {
    		fail("Result Comment Rule with no action should trigger validation error");
    	}
    }

    public void testEmptyDrugLevelCondition() {
    	boolean exceptionTriggered = false;
    	System.out.println("Empty Drug Level Condition");
    	try {
    		attemptTransformation("test/files/result_based_comments/EmptyDrugLevelCondition.xml");
    	} catch (ASIParsingException e) {
    		System.out.println("\t==> "+e.getCause());
    		assert(e.getCause().getMessage().contains("The content of element type \"DRUG_LEVEL_CONDITION\" is incomplete"));
    		exceptionTriggered = true;
        } catch (Exception e) {
        	System.out.println("Unexpected error: "+e.toString());
        	fail(e.getMessage());
        }
    	if (!exceptionTriggered) {
    		fail("Empty Drug Level Condition should trigger validation error");
    	}
    }

    public void testDrugLevelConditionWithNoDrug() {
    	boolean exceptionTriggered = false;
    	System.out.println("DrugLevelCondition with no drug");
    	try {
    		attemptTransformation("test/files/result_based_comments/DrugLevelConditionWithNoDrug.xml");
    	} catch (ASIParsingException e) {
    		System.out.println("\t==> "+e.getCause());
    		assert(e.getCause().getMessage().contains("The content of element type \"DRUG_LEVEL_CONDITION\" must match \"(DRUG_NAME,(LTE|LT|GTE|GT|EQ|NEQ)+)\"."));
    		exceptionTriggered = true;
        } catch (Exception e) {
        	System.out.println("Unexpected error: "+e.toString());
        	fail(e.getMessage());
        }
    	if (!exceptionTriggered) {
    		fail("Drug Level Condition with no drug should trigger validation error");
    	}
    }

    public void testDrugLevelConditionWithNoComparisons() {
    	boolean exceptionTriggered = false;
    	System.out.println("DrugLevelCondition with no comparisons");
    	try {
    		attemptTransformation("test/files/result_based_comments/DrugLevelConditionWithNoComparisons.xml");
    	} catch (ASIParsingException e) {
    		System.out.println("\t==> "+e.getCause());
    		assert(e.getCause().getMessage().contains("The content of element type \"DRUG_LEVEL_CONDITION\" is incomplete"));
    		exceptionTriggered = true;
        } catch (Exception e) {
        	System.out.println("Unexpected error: "+e.toString());
        	fail(e.getMessage());
        }
    	if (!exceptionTriggered) {
    		fail("Drug Level Condition with no drug should trigger validation error");
    	}
    }

    public void testMultipleResultCommentRules() {
    	//Multiple Level Rules for a drug - should be no errors
    	System.out.println("Multiple Result Comment Rules");
    	try {
    		attemptTransformation("test/files/result_based_comments/MultipleResultCommentRules.xml");
    	} catch (Exception e) {
            fail(e.getMessage());
            e.printStackTrace();
        }
    	System.out.println("\t==> No Errors");
    }

    public void testDrugLevelConditionWithMultipleComparisons() {
    	//Multiple comparisons in a level condition - should be no errors
    	System.out.println("Drug Level Condition with Multiple Comparisons");
    	try {
    		attemptTransformation("test/files/result_based_comments/DrugLevelConditionWithMultipleComparisons.xml");
    	} catch (Exception e) {
            fail(e.getMessage());
            e.printStackTrace();
        }
    	System.out.println("\t==> No Errors");
    }

    public void testEmptyLevelActions() {
    	boolean exceptionTriggered = false;
    	System.out.println("Empty Level Action");
    	try {
    		attemptTransformation("test/files/result_based_comments/EmptyLevelAction.xml");
    	} catch (ASIParsingException e) {
    		System.out.println("\t==> "+e.getCause());
    		assert(e.getCause().getMessage().contains("The content of element type \"LEVEL_ACTION\" is incomplete"));
    		exceptionTriggered = true;
        } catch (Exception e) {
        	System.out.println("Unexpected error: "+e.toString());
        	fail(e.getMessage());
        }
    	if (!exceptionTriggered) {
    		fail("Empty Level Action should trigger validation error");
    	}
    }

    public void testUndefinedDrug() {
    	boolean exceptionTriggered = false;
    	System.out.println("UndefinedDrug");
    	try {
    		attemptTransformation("test/files/result_based_comments/UndefinedDrug.xml");
    	} catch (ASIParsingException e) {
    		System.out.println("\t==> "+e.getMessage());
    		assert(e.getMessage().contains("has result comment rules but is not defined as a drug"));
    		exceptionTriggered = true;
        } catch (Exception e) {
        	System.out.println("Unexpected error: "+e.toString());
        	fail(e.getMessage());
        }
    	if (!exceptionTriggered) {
    		fail("Undefined Drug should trigger validation error");
    	}
    }

    public void testUndefinedLevel() {
    	boolean exceptionTriggered = false;
    	System.out.println("UndefinedLevel");
    	try {
    		attemptTransformation("test/files/result_based_comments/UndefinedLevel.xml");
    	} catch (ASIParsingException e) {
    		System.out.println("\t==> "+e.getMessage());
    		assert(e.getMessage().contains("has not been defined as a level order"));
    		exceptionTriggered = true;
        } catch (Exception e) {
        	System.out.println("Unexpected error: "+e.toString());
        	fail(e.getMessage());
        }
    	if (!exceptionTriggered) {
    		fail("Undefined Level should trigger validation error");
    	}
    }

}
