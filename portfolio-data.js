'use strict';

(() => {
  const cultures = {
  "soja": {
    "name": "Soja",
    "image": "media/soja-hd.webp",
    "path": "semente-de-soja/",
    "description": "Compare as cultivares e suas tecnologias. Nas opções com ficha detalhada, veja também o grupo de maturidade e o ciclo por região.",
    "reference": "Portfólio oficial Petrovina",
    "varieties": [
      {
        "name": "RAPTOR I2X",
        "technology": "I2X",
        "source": "https://petrovinasementes.com.br/semente-de-soja/raptor-i2x-brasmax/",
        "maturity": "7.1",
        "cycle": "100–112 dias",
        "regions": [
          [
            "MS · Norte",
            112
          ],
          [
            "MT · Sul",
            105
          ],
          [
            "MT · Médio Norte",
            101
          ],
          [
            "MT · Vale do Araguaia",
            105
          ],
          [
            "MT · Parecis",
            100
          ]
        ]
      },
      {
        "name": "OLIMPO IPRO",
        "technology": "IPRO",
        "source": "https://petrovinasementes.com.br/semente-de-soja/olimpo-ipro-brasmax/",
        "maturity": "8.0",
        "cycle": "108–120 dias",
        "regions": [
          [
            "MS · Norte",
            120
          ],
          [
            "MT · Sul",
            115
          ],
          [
            "MT · Médio Norte",
            108
          ],
          [
            "MT · Vale do Araguaia",
            112
          ],
          [
            "MT · Parecis",
            108
          ],
          [
            "RO · até 400 m",
            111
          ]
        ]
      },
      {
        "name": "TMG INGÁ I2X",
        "technology": "I2X",
        "source": "https://petrovinasementes.com.br/semente-de-soja/inga-i2x-tmg/",
        "maturity": "6.9",
        "cycle": "95–105 dias",
        "regions": [
          [
            "MS · Norte",
            105
          ],
          [
            "MT · Sul",
            105
          ],
          [
            "MT · Médio Norte",
            95
          ],
          [
            "MT · Vale do Araguaia",
            95
          ],
          [
            "MT · Parecis",
            98
          ]
        ]
      },
      {
        "name": "TORMENTA CE",
        "technology": "CE",
        "source": "https://petrovinasementes.com.br/semente-de-soja/tormenta-ce-brasmax/"
      },
      {
        "name": "COBRE I2X",
        "technology": "I2X",
        "source": "https://petrovinasementes.com.br/semente-de-soja/cobre-i2x-brasmax/"
      },
      {
        "name": "MITICA CE",
        "technology": "CE",
        "source": "https://petrovinasementes.com.br/semente-de-soja/mitica-ce-brasmax/"
      },
      {
        "name": "SPARTA I2X",
        "technology": "I2X",
        "source": "https://petrovinasementes.com.br/semente-de-soja/sparta-i2x-brasmax"
      },
      {
        "name": "ATAQUE I2X",
        "technology": "I2X",
        "source": "https://petrovinasementes.com.br/semente-de-soja/ataque-i2x-brasmax/"
      },
      {
        "name": "ORIGEM IPRO",
        "technology": "IPRO",
        "source": "https://petrovinasementes.com.br/semente-de-soja/origem-ipro-brasmax/"
      },
      {
        "name": "CRUZADA CE",
        "technology": "CE",
        "source": "https://petrovinasementes.com.br/semente-de-soja/cruzada-ce-brasmax/"
      },
      {
        "name": "IMPETO I2X",
        "technology": "I2X",
        "source": "https://petrovinasementes.com.br/semente-de-soja/"
      },
      {
        "name": "HERA I2X",
        "technology": "I2X",
        "source": "https://petrovinasementes.com.br/semente-de-soja/hera-i2x-brasmax/"
      },
      {
        "name": "MÍSSIL I2X",
        "technology": "I2X",
        "source": "https://petrovinasementes.com.br/semente-de-soja/missil-i2x/"
      },
      {
        "name": "M6620 i2X",
        "technology": "I2X",
        "source": "https://petrovinasementes.com.br/semente-de-soja/m-6620-i2x-monsoy/"
      },
      {
        "name": "M6930 i2X",
        "technology": "I2X",
        "source": "https://petrovinasementes.com.br/semente-de-soja/m-6930-i2x/"
      },
      {
        "name": "C2705 CE",
        "technology": "CE",
        "source": "https://petrovinasementes.com.br/semente-de-soja/c2705ce-cordius/"
      },
      {
        "name": "C2740 CE",
        "technology": "CE",
        "source": "https://petrovinasementes.com.br/semente-de-soja/c2740ce-cordius/"
      },
      {
        "name": "C2795 CE",
        "technology": "CE",
        "source": "https://petrovinasementes.com.br/semente-de-soja/"
      },
      {
        "name": "GH 2478 IPRO",
        "technology": "IPRO",
        "source": "https://petrovinasementes.com.br/semente-de-soja/gh-2478ipro-golden/"
      },
      {
        "name": "GH 2282 IPRO",
        "technology": "IPRO",
        "source": "https://petrovinasementes.com.br/semente-de-soja/gh-2282ipro-golden/"
      },
      {
        "name": "GH 2483 IPRO",
        "technology": "IPRO",
        "source": "https://petrovinasementes.com.br/semente-de-soja/gh-2483ipro-golden/"
      },
      {
        "name": "GH 2581 I2X",
        "technology": "I2X",
        "source": "https://petrovinasementes.com.br/semente-de-soja/gh2581-i2x"
      },
      {
        "name": "GH 2571 I2X",
        "technology": "I2X",
        "source": "https://petrovinasementes.com.br/semente-de-soja/gh-2571i2x-golden"
      },
      {
        "name": "TMG 2370 IPRO",
        "technology": "IPRO",
        "source": "https://petrovinasementes.com.br/semente-de-soja/2370-ipro-tmg/"
      },
      {
        "name": "TMG PAINEIRA I2X",
        "technology": "I2X",
        "source": "https://petrovinasementes.com.br/semente-de-soja/paineira-i2x-tmg/"
      },
      {
        "name": "TMG MURICI I2X",
        "technology": "I2X",
        "source": "https://petrovinasementes.com.br/semente-de-soja/murici-i2x-tmg/"
      },
      {
        "name": "TMG 2379 IPRO",
        "technology": "IPRO",
        "source": "https://petrovinasementes.com.br/semente-de-soja/2379-ipro-tmg/"
      },
      {
        "name": "TMG JATOBÁ IPRO",
        "technology": "IPRO",
        "source": "https://petrovinasementes.com.br/semente-de-soja/"
      },
      {
        "name": "TMG BRAÚNA I2X",
        "technology": "I2X",
        "source": "https://petrovinasementes.com.br/semente-de-soja/brauna-i2x-tmg/"
      },
      {
        "name": "TMG ITAÚBA I2X",
        "technology": "I2X",
        "source": "https://petrovinasementes.com.br/semente-de-soja/itauba-i2x-tmg/"
      },
      {
        "name": "TMG SUCUPIRA E",
        "technology": "E",
        "source": "https://petrovinasementes.com.br/semente-de-soja/sucupira-e/"
      },
      {
        "name": "78KA42 CE",
        "technology": "CE",
        "source": "https://petrovinasementes.com.br/semente-de-soja/78ka42-stine/"
      },
      {
        "name": "79KA72 CE",
        "technology": "CE",
        "source": "https://petrovinasementes.com.br/semente-de-soja/79ka72-stine/"
      },
      {
        "name": "80KA72 CE",
        "technology": "CE",
        "source": "https://petrovinasementes.com.br/semente-de-soja/80ka72-stine/"
      },
      {
        "name": "84KA92 CE",
        "technology": "CE",
        "source": "https://petrovinasementes.com.br/semente-de-soja/84ka92-stine/"
      },
      {
        "name": "76KA72 CE",
        "technology": "CE",
        "source": "https://petrovinasementes.com.br/semente-de-soja/"
      }
    ]
  },
  "milho": {
    "name": "Milho",
    "image": "media/milho-hd.webp",
    "path": "sementes-de-milho/",
    "description": "Explore os híbridos e as tecnologias publicados no portfólio Petrovina para a safra 25/26.",
    "reference": "Referência oficial · Safra 25/26",
    "varieties": [
      {
        "name": "SHS8010 VIP3",
        "technology": "VIP3",
        "source": "https://petrovinasementes.com.br/sementes-de-milho/"
      },
      {
        "name": "SHS7957 PRO4",
        "technology": "PRO4",
        "source": "https://petrovinasementes.com.br/sementes-de-milho/"
      },
      {
        "name": "SHS2050 PRO4",
        "technology": "PRO4",
        "source": "https://petrovinasementes.com.br/sementes-de-milho/"
      },
      {
        "name": "SHS7990 PRO3",
        "technology": "PRO3",
        "source": "https://petrovinasementes.com.br/sementes-de-milho/"
      },
      {
        "name": "SHS2065 PRO3",
        "technology": "PRO3",
        "source": "https://petrovinasementes.com.br/sementes-de-milho/"
      },
      {
        "name": "SHS7939 VIP3",
        "technology": "VIP3",
        "source": "https://petrovinasementes.com.br/sementes-de-milho/"
      },
      {
        "name": "9801 VIP3",
        "technology": "VIP3",
        "source": "https://petrovinasementes.com.br/sementes-de-milho/"
      },
      {
        "name": "9505 VIP3",
        "technology": "VIP3",
        "source": "https://petrovinasementes.com.br/sementes-de-milho/"
      },
      {
        "name": "9504 VIP3",
        "technology": "VIP3",
        "source": "https://petrovinasementes.com.br/sementes-de-milho/"
      },
      {
        "name": "9705 VIP3",
        "technology": "VIP3",
        "source": "https://petrovinasementes.com.br/sementes-de-milho/"
      },
      {
        "name": "9808 VIP3",
        "technology": "VIP3",
        "source": "https://petrovinasementes.com.br/sementes-de-milho/"
      }
    ]
  },
  "sorgo": {
    "name": "Sorgo",
    "image": "media/sorgo-hd.webp",
    "path": "sementes-de-sorgo/",
    "description": "Conheça os híbridos de sorgo apresentados pela Petrovina no portfólio da safra 24/25.",
    "reference": "Referência oficial · Safra 24/25",
    "varieties": [
      {
        "name": "SHS410",
        "technology": "",
        "source": "https://petrovinasementes.com.br/sementes-de-sorgo/"
      },
      {
        "name": "SHS570 ASTRAL",
        "technology": "",
        "source": "https://petrovinasementes.com.br/sementes-de-sorgo/"
      }
    ]
  },
  "algodao": {
    "name": "Algodão",
    "image": "media/algodao-hd.webp",
    "path": "sementes-de-algodao/",
    "description": "Conheça as variedades de algodão e consulte o ciclo e a tecnologia nas fichas da Petrovina.",
    "reference": "Portfólio oficial Petrovina",
    "varieties": [
      {
        "name": "2058 B3RF",
        "technology": "B3RF",
        "cycle": "Médio-precoce",
        "source": "https://petrovinasementes.com.br/algodao-2058b3rf/"
      },
      {
        "name": "2292 B3XF",
        "technology": "B3XF",
        "cycle": "Médio-precoce",
        "source": "https://petrovinasementes.com.br/algodao-2292b3xf/"
      },
      {
        "name": "3493 B2RF",
        "technology": "B2RF",
        "cycle": "Médio-precoce",
        "source": "https://petrovinasementes.com.br/algodao-3493b2rf-rkn/"
      }
    ]
  },
  "brachiaria": {
    "name": "Brachiaria",
    "image": "media/brachiaria-hd.webp",
    "path": "sementes-de-brachiaria/",
    "description": "Forrageiras e mixes de cobertura para diferentes objetivos no campo. Conte com o time Petrovina para definir a opção para sua região.",
    "reference": "Portfólio oficial Petrovina",
    "varieties": []
  }
};

  const normalize = value => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
  const getCulture = key => Object.hasOwn(cultures, key) ? cultures[key] : null;
  function search(key, query = '', technology = '') {
    const terms = normalize(query).split(/\s+/).filter(Boolean);
    return (getCulture(key)?.varieties || []).filter(item =>
      (!technology || item.technology === technology) && terms.every(term => normalize(item.name).includes(term)));
  }
  function selection(key, name) {
    return getCulture(key)?.varieties.find(item => item.name === name) || null;
  }
  function quoteUrl(key, name) {
    if (!getCulture(key)) return 'orcamento.html';
    const query = new URLSearchParams({cultura: key});
    const item = selection(key, name);
    if (item) query.set('cultivar', item.name);
    return `orcamento.html?${query}`;
  }
  window.PetrovinaPortfolio = {cultures, getCulture, search, selection, quoteUrl};
})();
