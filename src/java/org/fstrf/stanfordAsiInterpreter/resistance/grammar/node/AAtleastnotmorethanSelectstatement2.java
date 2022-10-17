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

public final class AAtleastnotmorethanSelectstatement2 extends PSelectstatement2<AAtleastnotmorethanSelectstatement2>
{
    private TAtleast _atleast_;
    private TInteger _atleastnumber_;
    private PLogicsymbol<?> _logicsymbol_;
    private TNotmorethan _notmorethan_;
    private TInteger _notmorethannumber_;
    private TFrom _from_;
    private TLPar _lPar_;
    private PSelectlist<?> _selectlist_;
    private TRPar _rPar_;

    public AAtleastnotmorethanSelectstatement2()
    {
    }

    public AAtleastnotmorethanSelectstatement2(
        TAtleast _atleast_,
        TInteger _atleastnumber_,
        PLogicsymbol<?> _logicsymbol_,
        TNotmorethan _notmorethan_,
        TInteger _notmorethannumber_,
        TFrom _from_,
        TLPar _lPar_,
        PSelectlist<?> _selectlist_,
        TRPar _rPar_)
    {
        setAtleast(_atleast_);

        setAtleastnumber(_atleastnumber_);

        setLogicsymbol(_logicsymbol_);

        setNotmorethan(_notmorethan_);

        setNotmorethannumber(_notmorethannumber_);

        setFrom(_from_);

        setLPar(_lPar_);

        setSelectlist(_selectlist_);

        setRPar(_rPar_);

    }
    
	@Override
    public AAtleastnotmorethanSelectstatement2 clone()
    {
        return new AAtleastnotmorethanSelectstatement2(
            (TAtleast) cloneNode(_atleast_),
            (TInteger) cloneNode(_atleastnumber_),
            (PLogicsymbol<?>) cloneNode(_logicsymbol_),
            (TNotmorethan) cloneNode(_notmorethan_),
            (TInteger) cloneNode(_notmorethannumber_),
            (TFrom) cloneNode(_from_),
            (TLPar) cloneNode(_lPar_),
            (PSelectlist<?>) cloneNode(_selectlist_),
            (TRPar) cloneNode(_rPar_));
    }

    @Override
	public void apply(Switch sw)
    {
        ((Analysis) sw).caseAAtleastnotmorethanSelectstatement2(this);
    }

    public TAtleast getAtleast()
    {
        return _atleast_;
    }

    public void setAtleast(TAtleast node)
    {
        if(_atleast_ != null)
        {
            _atleast_.parent(null);
        }

        if(node != null)
        {
            if(node.parent() != null)
            {
                node.parent().removeChild(node);
            }

            node.parent(this);
        }

        _atleast_ = node;
    }

    public TInteger getAtleastnumber()
    {
        return _atleastnumber_;
    }

    public void setAtleastnumber(TInteger node)
    {
        if(_atleastnumber_ != null)
        {
            _atleastnumber_.parent(null);
        }

        if(node != null)
        {
            if(node.parent() != null)
            {
                node.parent().removeChild(node);
            }

            node.parent(this);
        }

        _atleastnumber_ = node;
    }

    public PLogicsymbol<?> getLogicsymbol()
    {
        return _logicsymbol_;
    }

    public void setLogicsymbol(PLogicsymbol<?> node)
    {
        if(_logicsymbol_ != null)
        {
            _logicsymbol_.parent(null);
        }

        if(node != null)
        {
            if(node.parent() != null)
            {
                node.parent().removeChild(node);
            }

            node.parent(this);
        }

        _logicsymbol_ = node;
    }

    public TNotmorethan getNotmorethan()
    {
        return _notmorethan_;
    }

    public void setNotmorethan(TNotmorethan node)
    {
        if(_notmorethan_ != null)
        {
            _notmorethan_.parent(null);
        }

        if(node != null)
        {
            if(node.parent() != null)
            {
                node.parent().removeChild(node);
            }

            node.parent(this);
        }

        _notmorethan_ = node;
    }

    public TInteger getNotmorethannumber()
    {
        return _notmorethannumber_;
    }

    public void setNotmorethannumber(TInteger node)
    {
        if(_notmorethannumber_ != null)
        {
            _notmorethannumber_.parent(null);
        }

        if(node != null)
        {
            if(node.parent() != null)
            {
                node.parent().removeChild(node);
            }

            node.parent(this);
        }

        _notmorethannumber_ = node;
    }

    public TFrom getFrom()
    {
        return _from_;
    }

    public void setFrom(TFrom node)
    {
        if(_from_ != null)
        {
            _from_.parent(null);
        }

        if(node != null)
        {
            if(node.parent() != null)
            {
                node.parent().removeChild(node);
            }

            node.parent(this);
        }

        _from_ = node;
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

    public PSelectlist<?> getSelectlist()
    {
        return _selectlist_;
    }

    public void setSelectlist(PSelectlist<?> node)
    {
        if(_selectlist_ != null)
        {
            _selectlist_.parent(null);
        }

        if(node != null)
        {
            if(node.parent() != null)
            {
                node.parent().removeChild(node);
            }

            node.parent(this);
        }

        _selectlist_ = node;
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
            + toString(_atleast_)
            + toString(_atleastnumber_)
            + toString(_logicsymbol_)
            + toString(_notmorethan_)
            + toString(_notmorethannumber_)
            + toString(_from_)
            + toString(_lPar_)
            + toString(_selectlist_)
            + toString(_rPar_);
    }

    @Override
	void removeChild(Node<?> child)
    {
        if(_atleast_ == child)
        {
            _atleast_ = null;
            return;
        }

        if(_atleastnumber_ == child)
        {
            _atleastnumber_ = null;
            return;
        }

        if(_logicsymbol_ == child)
        {
            _logicsymbol_ = null;
            return;
        }

        if(_notmorethan_ == child)
        {
            _notmorethan_ = null;
            return;
        }

        if(_notmorethannumber_ == child)
        {
            _notmorethannumber_ = null;
            return;
        }

        if(_from_ == child)
        {
            _from_ = null;
            return;
        }

        if(_lPar_ == child)
        {
            _lPar_ = null;
            return;
        }

        if(_selectlist_ == child)
        {
            _selectlist_ = null;
            return;
        }

        if(_rPar_ == child)
        {
            _rPar_ = null;
            return;
        }

    }

    @Override
	<U extends Node<U>>void replaceChild(U oldChild, U newChild)
    {
        if(_atleast_ == oldChild)
        {
            setAtleast((TAtleast) newChild);
            return;
        }

        if(_atleastnumber_ == oldChild)
        {
            setAtleastnumber((TInteger) newChild);
            return;
        }

        if(_logicsymbol_ == oldChild)
        {
            setLogicsymbol((PLogicsymbol<?>) newChild);
            return;
        }

        if(_notmorethan_ == oldChild)
        {
            setNotmorethan((TNotmorethan) newChild);
            return;
        }

        if(_notmorethannumber_ == oldChild)
        {
            setNotmorethannumber((TInteger) newChild);
            return;
        }

        if(_from_ == oldChild)
        {
            setFrom((TFrom) newChild);
            return;
        }

        if(_lPar_ == oldChild)
        {
            setLPar((TLPar) newChild);
            return;
        }

        if(_selectlist_ == oldChild)
        {
            setSelectlist((PSelectlist<?>) newChild);
            return;
        }

        if(_rPar_ == oldChild)
        {
            setRPar((TRPar) newChild);
            return;
        }

    }
}
