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

package org.fstrf.stanfordAsiInterpreter.resistance.grammar.node;

import org.fstrf.stanfordAsiInterpreter.resistance.grammar.analysis.*;

@SuppressWarnings("all") public final class Start extends Node
{
    private PStatement _pStatement_;
    private EOF _eof_;

    public Start()
    {
    }

    public Start(
        PStatement _pStatement_,
        EOF _eof_)
    {
        setPStatement(_pStatement_);
        setEOF(_eof_);
    }

    public Object clone()
    {
        return new Start(
            (PStatement) cloneNode(_pStatement_),
            (EOF) cloneNode(_eof_));
    }

    public void apply(Switch sw)
    {
        ((Analysis) sw).caseStart(this);
    }

    public PStatement getPStatement()
    {
        return _pStatement_;
    }

    public void setPStatement(PStatement node)
    {
        if(_pStatement_ != null)
        {
            _pStatement_.parent(null);
        }

        if(node != null)
        {
            if(node.parent() != null)
            {
                node.parent().removeChild(node);
            }

            node.parent(this);
        }

        _pStatement_ = node;
    }

    public EOF getEOF()
    {
        return _eof_;
    }

    public void setEOF(EOF node)
    {
        if(_eof_ != null)
        {
            _eof_.parent(null);
        }

        if(node != null)
        {
            if(node.parent() != null)
            {
                node.parent().removeChild(node);
            }

            node.parent(this);
        }

        _eof_ = node;
    }

    void removeChild(Node child)
    {
        if(_pStatement_ == child)
        {
            _pStatement_ = null;
            return;
        }

        if(_eof_ == child)
        {
            _eof_ = null;
            return;
        }
    }

    void replaceChild(Node oldChild, Node newChild)
    {
        if(_pStatement_ == oldChild)
        {
            setPStatement((PStatement) newChild);
            return;
        }

        if(_eof_ == oldChild)
        {
            setEOF((EOF) newChild);
            return;
        }
    }

    public String toString()
    {
        return "" +
            toString(_pStatement_) +
            toString(_eof_);
    }
}
