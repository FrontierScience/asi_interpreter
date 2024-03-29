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

import java.util.LinkedList;
import java.util.List;
import java.util.ListIterator;

import org.fstrf.stanfordAsiInterpreter.resistance.grammar.analysis.Analysis;

public final class AResidueinvertResidue extends PResidue<AResidueinvertResidue>
{
    private TAminoAcid _originalaminoacid_;
    private TInteger _integer_;
    private TLPar _lPar_;
    private TNot _not_;
    private final LinkedList<TAminoAcid> _mutatedaminoacid_ = new TypedLinkedList<>(new Mutatedaminoacid_Cast());
    private TRPar _rPar_;

    public AResidueinvertResidue()
    {
    }

    public AResidueinvertResidue(
        TAminoAcid _originalaminoacid_,
        TInteger _integer_,
        TLPar _lPar_,
        TNot _not_,
        List<TAminoAcid> _mutatedaminoacid_,
        TRPar _rPar_)
    {
        setOriginalaminoacid(_originalaminoacid_);

        setInteger(_integer_);

        setLPar(_lPar_);

        setNot(_not_);

        {
            this._mutatedaminoacid_.clear();
            this._mutatedaminoacid_.addAll(_mutatedaminoacid_);
        }

        setRPar(_rPar_);

    }
    
    @SuppressWarnings("unchecked")
	@Override
    public AResidueinvertResidue clone()
    {
        return new AResidueinvertResidue(
            (TAminoAcid) cloneNode(_originalaminoacid_),
            (TInteger) cloneNode(_integer_),
            (TLPar) cloneNode(_lPar_),
            (TNot) cloneNode(_not_),
            (List<TAminoAcid>) cloneList(_mutatedaminoacid_),
            (TRPar) cloneNode(_rPar_));
    }

   	@Override
    public void apply(Switch sw)
    {
        ((Analysis) sw).caseAResidueinvertResidue(this);
    }

    public TAminoAcid getOriginalaminoacid()
    {
        return _originalaminoacid_;
    }

    public void setOriginalaminoacid(TAminoAcid node)
    {
        if(_originalaminoacid_ != null)
        {
            _originalaminoacid_.parent(null);
        }

        if(node != null)
        {
            if(node.parent() != null)
            {
                node.parent().removeChild(node);
            }

            node.parent(this);
        }

        _originalaminoacid_ = node;
    }

    public TInteger getInteger()
    {
        return _integer_;
    }

    public void setInteger(TInteger node)
    {
        if(_integer_ != null)
        {
            _integer_.parent(null);
        }

        if(node != null)
        {
            if(node.parent() != null)
            {
                node.parent().removeChild(node);
            }

            node.parent(this);
        }

        _integer_ = node;
    }

    public TLPar getLPar()
    {
        return _lPar_;
    }

    public void setLPar(TLPar node)
    {
        if(_lPar_ != null)
        {
            _lPar_.parent(null);
        }

        if(node != null)
        {
            if(node.parent() != null)
            {
                node.parent().removeChild(node);
            }

            node.parent(this);
        }

        _lPar_ = node;
    }

    public TNot getNot()
    {
        return _not_;
    }

    public void setNot(TNot node)
    {
        if(_not_ != null)
        {
            _not_.parent(null);
        }

        if(node != null)
        {
            if(node.parent() != null)
            {
                node.parent().removeChild(node);
            }

            node.parent(this);
        }

        _not_ = node;
    }

    public LinkedList<TAminoAcid> getMutatedaminoacid()
    {
        return _mutatedaminoacid_;
    }

    public void setMutatedaminoacid(List<TAminoAcid> list)
    {
        _mutatedaminoacid_.clear();
        _mutatedaminoacid_.addAll(list);
    }

    public TRPar getRPar()
    {
        return _rPar_;
    }

    public void setRPar(TRPar node)
    {
        if(_rPar_ != null)
        {
            _rPar_.parent(null);
        }

        if(node != null)
        {
            if(node.parent() != null)
            {
                node.parent().removeChild(node);
            }

            node.parent(this);
        }

        _rPar_ = node;
    }

   	@Override
    public String toString()
    {
        return ""
            + toString(_originalaminoacid_)
            + toString(_integer_)
            + toString(_lPar_)
            + toString(_not_)
            + toString(_mutatedaminoacid_)
            + toString(_rPar_);
    }

   	@Override
    void removeChild(Node<?> child)
    {
        if(_originalaminoacid_ == child)
        {
            _originalaminoacid_ = null;
            return;
        }

        if(_integer_ == child)
        {
            _integer_ = null;
            return;
        }

        if(_lPar_ == child)
        {
            _lPar_ = null;
            return;
        }

        if(_not_ == child)
        {
            _not_ = null;
            return;
        }

        if(_mutatedaminoacid_.remove(child))
        {
            return;
        }

        if(_rPar_ == child)
        {
            _rPar_ = null;
            return;
        }

    }

   	@Override
    <U extends Node<U>> void replaceChild(U oldChild, U newChild)
    {
        if(_originalaminoacid_ == oldChild)
        {
            setOriginalaminoacid((TAminoAcid) newChild);
            return;
        }

        if(_integer_ == oldChild)
        {
            setInteger((TInteger) newChild);
            return;
        }

        if(_lPar_ == oldChild)
        {
            setLPar((TLPar) newChild);
            return;
        }

        if(_not_ == oldChild)
        {
            setNot((TNot) newChild);
            return;
        }

        for(ListIterator<TAminoAcid> i = _mutatedaminoacid_.listIterator(); i.hasNext();)
        {
            if(i.next() == oldChild)
            {
                if(newChild != null)
                {
                    i.set((TAminoAcid) newChild);
                    oldChild.parent(null);
                    return;
                }

                i.remove();
                oldChild.parent(null);
                return;
            }
        }

        if(_rPar_ == oldChild)
        {
            setRPar((TRPar) newChild);
            return;
        }

    }

    private class Mutatedaminoacid_Cast implements Cast<TAminoAcid>
    {
    	@Override
        public TAminoAcid cast(Object o)
        {
            TAminoAcid node = (TAminoAcid) o;

            if((node.parent() != null) &&
                (node.parent() != AResidueinvertResidue.this))
            {
                node.parent().removeChild(node);
            }

            if((node.parent() == null) ||
                (node.parent() != AResidueinvertResidue.this))
            {
                node.parent(AResidueinvertResidue.this);
            }

            return node;
        }
    }
}
