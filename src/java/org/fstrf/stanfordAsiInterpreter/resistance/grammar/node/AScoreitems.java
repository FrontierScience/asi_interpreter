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

import org.fstrf.stanfordAsiInterpreter.resistance.grammar.analysis.Analysis;

public final class AScoreitems extends PScoreitems<AScoreitems>
{
    private TComma _comma_;
    private PScoreitem<?> _scoreitem_;

    public AScoreitems()
    {
    }

    public AScoreitems(
        TComma _comma_,
        PScoreitem<?> _scoreitem_)
    {
        setComma(_comma_);

        setScoreitem(_scoreitem_);

    }

	@Override
    public AScoreitems clone()
    {
        return new AScoreitems(
            (TComma) cloneNode(_comma_),
            (PScoreitem<?>) cloneNode(_scoreitem_));
    }

    @Override
	public void apply(Switch sw)
    {
        ((Analysis) sw).caseAScoreitems(this);
    }

    public TComma getComma()
    {
        return _comma_;
    }

    public void setComma(TComma node)
    {
        if(_comma_ != null)
        {
            _comma_.parent(null);
        }

        if(node != null)
        {
            if(node.parent() != null)
            {
                node.parent().removeChild(node);
            }

            node.parent(this);
        }

        _comma_ = node;
    }

    public PScoreitem<?> getScoreitem()
    {
        return _scoreitem_;
    }

    public void setScoreitem(PScoreitem<?> node)
    {
        if(_scoreitem_ != null)
        {
            _scoreitem_.parent(null);
        }

        if(node != null)
        {
            if(node.parent() != null)
            {
                node.parent().removeChild(node);
            }

            node.parent(this);
        }

        _scoreitem_ = node;
    }

	@Override
    public String toString()
    {
        return ""
            + toString(_comma_)
            + toString(_scoreitem_);
    }

    @Override
	void removeChild(Node<?> child)
    {
        if(_comma_ == child)
        {
            _comma_ = null;
            return;
        }

        if(_scoreitem_ == child)
        {
            _scoreitem_ = null;
            return;
        }

    }

    @Override
	<U extends Node<U>> void replaceChild(U oldChild, U newChild)
    {
        if(_comma_ == oldChild)
        {
            setComma((TComma) newChild);
            return;
        }

        if(_scoreitem_ == oldChild)
        {
            setScoreitem((PScoreitem<?>) newChild);
            return;
        }

    }
}
