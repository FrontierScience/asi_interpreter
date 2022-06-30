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



/* This file was generated by SableCC (http://www.sablecc.org/). */

package org.fstrf.stanfordAsiInterpreter.resistance.grammar.lexer;

import java.io.*;
import java.util.*;
import org.fstrf.stanfordAsiInterpreter.resistance.grammar.node.*;

@SuppressWarnings("all") public class Lexer
{
    protected Token token;
    protected State state = State.INITIAL;

    private PushbackReader in;
    private int line;
    private int pos;
    private boolean cr;
    private boolean eof;
    private final StringBuffer text = new StringBuffer();

    protected void filter() throws LexerException, IOException
    {
    }

    public Lexer(PushbackReader in)
    {
        this.in = in;
    }
 
    public Token peek() throws LexerException, IOException
    {
        while(token == null)
        {
            token = getToken();
            filter();
        }

        return token;
    }

    public Token next() throws LexerException, IOException
    {
        while(token == null)
        {
            token = getToken();
            filter();
        }

        Token result = token;
        token = null;
        return result;
    }

    protected Token getToken() throws IOException, LexerException
    {
        int dfa_state = 0;

        int start_pos = pos;
        int start_line = line;

        int accept_state = -1;
        int accept_token = -1;
        int accept_length = -1;
        int accept_pos = -1;
        int accept_line = -1;

        int[][][] gotoTable = this.gotoTable[state.id()];
        int[] accept = this.accept[state.id()];
        text.setLength(0);

        while(true)
        {
            int c = getChar();

            if(c != -1)
            {
                switch(c)
                {
                case 10:
                    if(cr)
                    {
                        cr = false;
                    }
                    else
                    {
                        line++;
                        pos = 0;
                    }
                    break;
                case 13:
                    line++;
                    pos = 0;
                    cr = true;
                    break;
                default:
                    pos++;
                    cr = false;
                    break;
                };

                text.append((char) c);

                do
                {
                    int oldState = (dfa_state < -1) ? (-2 -dfa_state) : dfa_state;

                    dfa_state = -1;

                    int[][] tmp1 =  gotoTable[oldState];
                    int low = 0;
                    int high = tmp1.length - 1;

                    while(low <= high)
                    {
                        int middle = (low + high) / 2;
                        int[] tmp2 = tmp1[middle];

                        if(c < tmp2[0])
                        {
                            high = middle - 1;
                        }
                        else if(c > tmp2[1])
                        {
                            low = middle + 1;
                        }
                        else
                        {
                            dfa_state = tmp2[2];
                            break;
                        }
                    }
                }while(dfa_state < -1);
            }
            else
            {
                dfa_state = -1;
            }

            if(dfa_state >= 0)
            {
                if(accept[dfa_state] != -1)
                {
                    accept_state = dfa_state;
                    accept_token = accept[dfa_state];
                    accept_length = text.length();
                    accept_pos = pos;
                    accept_line = line;
                }
            }
            else
            {
                if(accept_state != -1)
                {
                    switch(accept_token)
                    {
                    case 0:
                        {
                            Token token = new0(
                                start_line + 1,
                                start_pos + 1);
                            pushBack(accept_length);
                            pos = accept_pos;
                            line = accept_line;
                            return token;
                        }
                    case 1:
                        {
                            Token token = new1(
                                start_line + 1,
                                start_pos + 1);
                            pushBack(accept_length);
                            pos = accept_pos;
                            line = accept_line;
                            return token;
                        }
                    case 2:
                        {
                            Token token = new2(
                                start_line + 1,
                                start_pos + 1);
                            pushBack(accept_length);
                            pos = accept_pos;
                            line = accept_line;
                            return token;
                        }
                    case 3:
                        {
                            Token token = new3(
                                start_line + 1,
                                start_pos + 1);
                            pushBack(accept_length);
                            pos = accept_pos;
                            line = accept_line;
                            return token;
                        }
                    case 4:
                        {
                            Token token = new4(
                                start_line + 1,
                                start_pos + 1);
                            pushBack(accept_length);
                            pos = accept_pos;
                            line = accept_line;
                            return token;
                        }
                    case 5:
                        {
                            Token token = new5(
                                start_line + 1,
                                start_pos + 1);
                            pushBack(accept_length);
                            pos = accept_pos;
                            line = accept_line;
                            return token;
                        }
                    case 6:
                        {
                            Token token = new6(
                                start_line + 1,
                                start_pos + 1);
                            pushBack(accept_length);
                            pos = accept_pos;
                            line = accept_line;
                            return token;
                        }
                    case 7:
                        {
                            Token token = new7(
                                start_line + 1,
                                start_pos + 1);
                            pushBack(accept_length);
                            pos = accept_pos;
                            line = accept_line;
                            return token;
                        }
                    case 8:
                        {
                            Token token = new8(
                                start_line + 1,
                                start_pos + 1);
                            pushBack(accept_length);
                            pos = accept_pos;
                            line = accept_line;
                            return token;
                        }
                    case 9:
                        {
                            Token token = new9(
                                start_line + 1,
                                start_pos + 1);
                            pushBack(accept_length);
                            pos = accept_pos;
                            line = accept_line;
                            return token;
                        }
                    case 10:
                        {
                            Token token = new10(
                                start_line + 1,
                                start_pos + 1);
                            pushBack(accept_length);
                            pos = accept_pos;
                            line = accept_line;
                            return token;
                        }
                    case 11:
                        {
                            Token token = new11(
                                start_line + 1,
                                start_pos + 1);
                            pushBack(accept_length);
                            pos = accept_pos;
                            line = accept_line;
                            return token;
                        }
                    case 12:
                        {
                            Token token = new12(
                                start_line + 1,
                                start_pos + 1);
                            pushBack(accept_length);
                            pos = accept_pos;
                            line = accept_line;
                            return token;
                        }
                    case 13:
                        {
                            Token token = new13(
                                start_line + 1,
                                start_pos + 1);
                            pushBack(accept_length);
                            pos = accept_pos;
                            line = accept_line;
                            return token;
                        }
                    case 14:
                        {
                            Token token = new14(
                                start_line + 1,
                                start_pos + 1);
                            pushBack(accept_length);
                            pos = accept_pos;
                            line = accept_line;
                            return token;
                        }
                    case 15:
                        {
                            Token token = new15(
                                start_line + 1,
                                start_pos + 1);
                            pushBack(accept_length);
                            pos = accept_pos;
                            line = accept_line;
                            return token;
                        }
                    case 16:
                        {
                            Token token = new16(
                                getText(accept_length),
                                start_line + 1,
                                start_pos + 1);
                            pushBack(accept_length);
                            pos = accept_pos;
                            line = accept_line;
                            return token;
                        }
                    case 17:
                        {
                            Token token = new17(
                                getText(accept_length),
                                start_line + 1,
                                start_pos + 1);
                            pushBack(accept_length);
                            pos = accept_pos;
                            line = accept_line;
                            return token;
                        }
                    case 18:
                        {
                            Token token = new18(
                                getText(accept_length),
                                start_line + 1,
                                start_pos + 1);
                            pushBack(accept_length);
                            pos = accept_pos;
                            line = accept_line;
                            return token;
                        }
                    case 19:
                        {
                            Token token = new19(
                                getText(accept_length),
                                start_line + 1,
                                start_pos + 1);
                            pushBack(accept_length);
                            pos = accept_pos;
                            line = accept_line;
                            return token;
                        }
                    }
                }
                else
                {
                    if(text.length() > 0)
                    {
                        throw new LexerException(
                            "[" + (start_line + 1) + "," + (start_pos + 1) + "]" +
                            " Unknown token: " + text);
                    }
                    else
                    {
                        EOF token = new EOF(
                            start_line + 1,
                            start_pos + 1);
                        return token;
                    }
                }
            }
        }
    }

    Token new0(int line, int pos) { return new TMin(line, pos); }
    Token new1(int line, int pos) { return new TAnd(line, pos); }
    Token new2(int line, int pos) { return new TOr(line, pos); }
    Token new3(int line, int pos) { return new TNot(line, pos); }
    Token new4(int line, int pos) { return new TExclude(line, pos); }
    Token new5(int line, int pos) { return new TSelect(line, pos); }
    Token new6(int line, int pos) { return new TFrom(line, pos); }
    Token new7(int line, int pos) { return new TAtleast(line, pos); }
    Token new8(int line, int pos) { return new TExactly(line, pos); }
    Token new9(int line, int pos) { return new TNotmorethan(line, pos); }
    Token new10(int line, int pos) { return new TScore(line, pos); }
    Token new11(int line, int pos) { return new TMax(line, pos); }
    Token new12(int line, int pos) { return new TLPar(line, pos); }
    Token new13(int line, int pos) { return new TRPar(line, pos); }
    Token new14(int line, int pos) { return new TMapper(line, pos); }
    Token new15(int line, int pos) { return new TComma(line, pos); }
    Token new16(String text, int line, int pos) { return new TBlank(text, line, pos); }
    Token new17(String text, int line, int pos) { return new TInteger(text, line, pos); }
    Token new18(String text, int line, int pos) { return new TFloat(text, line, pos); }
    Token new19(String text, int line, int pos) { return new TAminoAcid(text, line, pos); }

    private int getChar() throws IOException
    {
        if(eof)
        {
            return -1;
        }

        int result = in.read();

        if(result == -1)
        {
            eof = true;
        }

        return result;
    }

    private void pushBack(int acceptLength) throws IOException
    {
        int length = text.length();
        for(int i = length - 1; i >= acceptLength; i--)
        {
            eof = false;

            in.unread(text.charAt(i));
        }
    }

    protected void unread(Token token) throws IOException
    {
        String text = token.getText();
        int length = text.length();

        for(int i = length - 1; i >= 0; i--)
        {
            eof = false;

            in.unread(text.charAt(i));
        }

        pos = token.getPos() - 1;
        line = token.getLine() - 1;
    }

    private String getText(int acceptLength)
    {
        StringBuffer s = new StringBuffer(acceptLength);
        for(int i = 0; i < acceptLength; i++)
        {
            s.append(text.charAt(i));
        }

        return s.toString();
    }

    private static int[][][][] gotoTable;
/*  {
        { // INITIAL
            {{9, 9, 1}, {10, 10, 2}, {13, 13, 3}, {32, 32, 4}, {40, 40, 5}, {41, 41, 6}, {44, 44, 7}, {45, 45, 8}, {48, 57, 9}, {61, 61, 10}, {65, 65, 11}, {67, 67, 12}, {68, 68, 13}, {69, 69, 14}, {70, 70, 15}, {71, 71, 16}, {72, 72, 17}, {73, 73, 18}, {75, 75, 19}, {76, 76, 20}, {77, 77, 21}, {78, 78, 22}, {79, 79, 23}, {80, 80, 24}, {81, 81, 25}, {82, 82, 26}, {83, 83, 27}, {84, 84, 28}, {86, 86, 29}, {87, 87, 30}, {89, 89, 31}, {90, 90, 32}, {100, 100, 33}, {105, 105, 34}, },
            {{9, 32, -2}, },
            {{9, 32, -2}, },
            {{9, 32, -2}, },
            {{9, 32, -2}, },
            {},
            {},
            {},
            {},
            {{46, 46, 35}, {48, 57, 9}, },
            {{62, 62, 36}, },
            {{78, 78, 37}, {84, 84, 38}, },
            {},
            {},
            {{88, 88, 39}, },
            {{82, 82, 40}, },
            {},
            {},
            {},
            {},
            {},
            {{65, 65, 41}, },
            {{79, 79, 42}, },
            {{82, 82, 43}, },
            {},
            {},
            {},
            {{67, 67, 44}, {69, 69, 45}, },
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {{48, 57, 46}, },
            {},
            {{68, 68, 47}, },
            {{76, 76, 48}, },
            {{65, 65, 49}, {67, 67, 50}, },
            {{79, 79, 51}, },
            {{88, 88, 52}, },
            {{84, 84, 53}, },
            {},
            {{79, 79, 54}, },
            {{76, 76, 55}, },
            {{48, 57, 46}, },
            {},
            {{69, 69, 56}, },
            {{67, 67, 57}, },
            {{76, 76, 58}, },
            {{77, 77, 59}, },
            {},
            {{77, 77, 60}, },
            {{82, 82, 61}, },
            {{69, 69, 62}, },
            {{65, 65, 63}, },
            {{84, 84, 64}, },
            {{85, 85, 65}, },
            {},
            {{79, 79, 66}, },
            {{69, 69, 67}, },
            {{67, 67, 68}, },
            {{83, 83, 69}, },
            {{76, 76, 70}, },
            {{68, 68, 71}, },
            {{82, 82, 72}, },
            {},
            {{84, 84, 73}, },
            {{84, 84, 74}, },
            {{89, 89, 75}, },
            {{69, 69, 76}, },
            {{69, 69, 77}, },
            {},
            {},
            {},
            {},
            {{84, 84, 78}, },
            {{72, 72, 79}, },
            {{65, 65, 80}, },
            {{78, 78, 81}, },
            {},
        }
    };*/

    private static int[][] accept;
/*  {
        // INITIAL
        {-1, 16, 16, 16, 16, 12, 13, 15, 0, 17, -1, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, -1, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, -1, 14, -1, -1, -1, -1, -1, -1, 2, -1, -1, 18, 1, -1, -1, -1, -1, 11, 3, -1, -1, -1, -1, -1, 6, -1, -1, -1, -1, -1, -1, -1, 10, -1, -1, -1, -1, -1, 5, 7, 8, 4, -1, -1, -1, -1, 9, },

    };*/

    public static class State
    {
        public final static State INITIAL = new State(0);

        private int id;

        private State(int id)
        {
            this.id = id;
        }

        public int id()
        {
            return id;
        }
    }

    static 
    {
        try
        {
            DataInputStream s = new DataInputStream(
                new BufferedInputStream(
                Lexer.class.getResourceAsStream("lexer.dat")));

            // read gotoTable
            int length = s.readInt();
            gotoTable = new int[length][][][];
            for(int i = 0; i < gotoTable.length; i++)
            {
                length = s.readInt();
                gotoTable[i] = new int[length][][];
                for(int j = 0; j < gotoTable[i].length; j++)
                {
                    length = s.readInt();
                    gotoTable[i][j] = new int[length][3];
                    for(int k = 0; k < gotoTable[i][j].length; k++)
                    {
                        for(int l = 0; l < 3; l++)
                        {
                            gotoTable[i][j][k][l] = s.readInt();
                        }
                    }
                }
            }

            // read accept
            length = s.readInt();
            accept = new int[length][];
            for(int i = 0; i < accept.length; i++)
            {
                length = s.readInt();
                accept[i] = new int[length];
                for(int j = 0; j < accept[i].length; j++)
                {
                    accept[i][j] = s.readInt();
                }
            }

            s.close();
        }
        catch(Exception e)
        {
            throw new RuntimeException("The file \"lexer.dat\" is either missing or corrupted.");
        }
    }
}
